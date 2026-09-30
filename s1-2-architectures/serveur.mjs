// Démo « MPA, SPA, SSR » : la même liste d'offres BabStage, construite de trois façons.
// Aucune dépendance à installer.
//
// Lancement (Node.js 20 ou plus), puis ouvrir http://localhost:3002 :
//   node serveur.mjs
// Options, par variables d'environnement :
//   PORT=3002        le port d'écoute
//   LATENCE=400      délai de l'API (les données JSON), en millisecondes
//   JS_DELAI=1500    délai avant l'envoi du JavaScript des versions SPA et SSR :
//                    il imite un gros fichier JavaScript sur un réseau lent
// Sous PowerShell : $env:JS_DELAI=4000; node serveur.mjs
// Avec Docker (sans installer Node.js) : voir README.md.
//
//   /mpa/offres   multipage : le serveur fabrique une page HTML complète à chaque clic
//   /spa/offres   monopage : le serveur envoie une page vide et du JavaScript,
//                 le navigateur fabrique l'écran avec les données de /api/...
//   /ssr/offres   rendu serveur : le serveur fabrique la page (avec public/vues.mjs,
//                 le même code que le navigateur), puis le JavaScript l'« hydrate »

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { vueListe, vueDetail, vueErreur, vueTemoin, echapper } from './public/vues.mjs';

const PORT = Number(process.env.PORT ?? 3002);
const LATENCE = Number(process.env.LATENCE ?? 400);
const JS_DELAI = Number(process.env.JS_DELAI ?? 1500);

const db = JSON.parse(readFileSync(new URL('../donnees/db.json', import.meta.url), 'utf8'));
const publiees = db.offers
  .filter((o) => o.status === 'published')
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));
const villes = [...new Set(publiees.map((o) => o.city))].sort((a, b) => a.localeCompare(b, 'fr'));

// Les favoris de la version MPA sont gardés sur le serveur (en mémoire, pour tous
// les visiteurs) : en MPA, c'est le serveur qui connaît l'état de la page.
const favorisMpa = new Set();

const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function listerOffres(ville) {
  const offres = ville ? publiees.filter((o) => o.city === ville) : publiees;
  return { items: offres.slice(0, 12), total: offres.length };
}

function fichier(nom) {
  return readFileSync(new URL(`./public/${nom}`, import.meta.url), 'utf8');
}

function envoyer(res, statut, type, corps) {
  res.writeHead(statut, { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'no-store' });
  res.end(corps);
}

// Le squelette commun des pages. `contenu` va dans <main id="root">.
function page({ mode, titre, contenu, temoin, fin = '' }) {
  const noms = { mpa: 'MPA : multipage', spa: 'SPA : monopage', ssr: 'SSR : rendu serveur' };
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${echapper(titre)}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body class="${mode}">
  <header>
    <p class="marque"><a href="/">BabStage</a> <span class="badge">${noms[mode]}</span></p>
    <nav>Même page, autre architecture :
      <a href="/mpa/offres">MPA</a> <a href="/spa/offres">SPA</a> <a href="/ssr/offres">SSR</a></nav>
  </header>
  <main id="root">${contenu}</main>
  <p class="temoin" id="temoin">${temoin}</p>
${fin}</body>
</html>`;
}

const ACCUEIL = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Démo MPA, SPA, SSR</title><link rel="stylesheet" href="/style.css"></head>
<body><main class="accueil">
<h1>La même page, trois architectures</h1>
<p>Les trois versions affichent les mêmes offres BabStage. Ouvrez-les l'une après l'autre,
avec les outils de développement (F12, onglet <strong>Network</strong>, case « Disable cache » cochée).</p>
<ul class="choix-archi">
<li><a href="/mpa/offres"><strong>MPA</strong> : multipage</a> le serveur fabrique une page HTML complète à chaque clic.</li>
<li><a href="/spa/offres"><strong>SPA</strong> : monopage</a> le serveur envoie une page vide et du JavaScript ; le navigateur fabrique l'écran.</li>
<li><a href="/ssr/offres"><strong>SSR</strong> : rendu serveur</a> le serveur fabrique la page, puis le JavaScript la rend interactive (hydratation).</li>
</ul>
<h2>Le détective : trois gestes pour reconnaître une architecture</h2>
<ol>
<li><strong>Ctrl+U</strong> (afficher le code source) : les offres sont-elles dans le HTML reçu ?</li>
<li><strong>F12, onglet Network</strong> : au clic sur une offre, reçoit-on un document HTML (type <em>document</em>) ou des données (type <em>fetch</em>) ?</li>
<li><strong>Désactiver JavaScript</strong> (F12, Ctrl+Maj+P, « Disable JavaScript ») puis recharger : que reste-t-il ?</li>
</ol>
<p class="petit">Réglages actuels : le JavaScript des versions SPA et SSR arrive après ${JS_DELAI} ms (JS_DELAI),
l'API répond en ${LATENCE} ms (LATENCE). L'API seule : <a href="/api/offers">/api/offers</a>.</p>
</main></body></html>`;

async function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const [racine, ressource, id] = url.pathname.split('/').filter(Boolean); // ['mpa', 'offres', 'o-0004']
  const ville = url.searchParams.get('ville') ?? '';

  // ---------- Fichiers ----------
  if (url.pathname === '/') return envoyer(res, 200, 'text/html', ACCUEIL);
  if (url.pathname === '/style.css') return envoyer(res, 200, 'text/css', fichier('style.css'));
  if (url.pathname === '/commun/vues.mjs') return envoyer(res, 200, 'text/javascript', fichier('vues.mjs'));
  if (url.pathname === '/commun/client.mjs') return envoyer(res, 200, 'text/javascript', fichier('client.mjs'));
  if (url.pathname === '/spa/app.js' || url.pathname === '/ssr/app.js') {
    await attendre(JS_DELAI); // un gros fichier JavaScript, sur un réseau lent
    const mode = racine;
    return envoyer(res, 200, 'text/javascript',
      `import { demarrer } from '/commun/client.mjs';\ndemarrer({ mode: '${mode}', dejaRendu: ${mode === 'ssr'} });\n`);
  }

  // ---------- L'API : des données, pas des pages ----------
  if (racine === 'api') {
    await attendre(LATENCE);
    if (ressource === 'villes') return envoyer(res, 200, 'application/json', JSON.stringify(villes));
    if (ressource === 'offers' && !id) return envoyer(res, 200, 'application/json', JSON.stringify(listerOffres(ville)));
    if (ressource === 'offers') {
      const offre = publiees.find((o) => o.id === id);
      return offre
        ? envoyer(res, 200, 'application/json', JSON.stringify(offre))
        : envoyer(res, 404, 'application/json', JSON.stringify({ message: `Offre ${id} introuvable` }));
    }
  }

  // ---------- MPA : une page HTML complète à chaque requête ----------
  if (racine === 'mpa' && req.method === 'POST' && ressource === 'favoris') {
    if (favorisMpa.has(id)) favorisMpa.delete(id); else favorisMpa.add(id);
    // Après un POST, on redirige : le navigateur redemande (GET) la page d'où l'on vient.
    res.writeHead(303, { Location: req.headers.referer ?? '/mpa/offres' });
    return res.end();
  }
  if (racine === 'mpa' || racine === 'ssr') {
    const mode = racine;
    if (ressource !== 'offres') {
      res.writeHead(302, { Location: `/${mode}/offres` });
      return res.end();
    }
    const favoris = mode === 'mpa' ? favorisMpa : new Set();
    let contenu;
    let titre;
    let statut = 200;
    if (id) {
      const offre = publiees.find((o) => o.id === id);
      if (offre) {
        contenu = vueDetail({ offre, mode, favoris });
        titre = `${offre.title} · ${mode.toUpperCase()}`;
      } else {
        statut = 404;
        contenu = vueErreur(`Offre ${id} introuvable`, mode);
        titre = 'Offre introuvable';
      }
    } else {
      const { items, total } = listerOffres(ville);
      contenu = vueListe({ offres: items, total, ville, villes, mode, favoris });
      titre = `Offres · ${mode.toUpperCase()}`;
    }
    // SSR : on ajoute le JavaScript qui hydratera la page, et les données déjà
    // utilisées par le serveur (le navigateur n'a pas à les redemander).
    // Le « < » est échappé pour qu'un texte ne puisse pas fermer la balise <script>.
    const fin = mode === 'ssr'
      ? `  <p class="hydratation" id="hydratation">⏳ JavaScript pas encore arrivé : la page est visible, mais les ☆ et les liens ne sont pas encore pris en charge par JavaScript.</p>
  <script type="application/json" id="donnees">${JSON.stringify({ villes }).replace(/</g, '\\u003c')}</script>
  <script type="module" src="/ssr/app.js"></script>\n`
      : '';
    return envoyer(res, statut, 'text/html', page({ mode, titre, contenu, temoin: vueTemoin('le serveur'), fin }));
  }

  // ---------- SPA : toujours la même page vide, quelle que soit l'adresse ----------
  if (racine === 'spa') {
    return envoyer(res, 200, 'text/html', page({
      mode: 'spa',
      titre: 'BabStage · SPA',
      contenu: '',
      temoin: 'Pas encore de HTML : JavaScript arrive…',
      fin: '  <noscript><p class="erreur">Cette version a besoin de JavaScript : sans lui, la page reste vide.</p></noscript>\n  <script type="module" src="/spa/app.js"></script>\n',
    }));
  }

  return envoyer(res, 404, 'text/plain', `Adresse inconnue : ${url.pathname}`);
}

createServer((req, res) => {
  router(req, res).catch((erreur) => {
    console.error(erreur);
    envoyer(res, 500, 'text/plain', 'Erreur du serveur');
  });
}).listen(PORT, () => {
  console.log(`Démo MPA, SPA, SSR : http://localhost:${PORT}`);
  console.log(`  LATENCE=${LATENCE} ms (API), JS_DELAI=${JS_DELAI} ms (JavaScript des versions SPA et SSR)`);
});

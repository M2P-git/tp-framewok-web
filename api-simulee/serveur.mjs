// L'API simulée de BabStage, pour le mois 1 (aucune dépendance à installer).
//
// Lancement (Node.js 20 ou plus) :
//   node serveur.mjs
// Options, par variables d'environnement :
//   PORT=3001      le port d'écoute
//   LATENCE=300    délai ajouté à chaque réponse, en millisecondes
//   PANNE=0.2      probabilité qu'une requête échoue (erreur 500 simulée)
//   ALEATOIRE=1    latence tirée au hasard entre 0 et 2 x LATENCE : les réponses
//                  peuvent alors arriver dans le désordre (démonstration de S3)
// Sous PowerShell : $env:LATENCE=1500; node serveur.mjs
//
// Les candidatures envoyées sont gardées en mémoire : elles disparaissent
// quand on arrête le serveur. Nous réglerons ce problème en S6 avec MongoDB.
// Ce fichier montre aussi à quoi ressemble un serveur écrit « à la main »,
// sans framework : nous le comparerons à Express en S5.

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const PORT = Number(process.env.PORT ?? 3001);
const LATENCE = Number(process.env.LATENCE ?? 300);
const PANNE = Number(process.env.PANNE ?? 0);
const ALEATOIRE = process.env.ALEATOIRE === '1';

const db = JSON.parse(
  readFileSync(new URL('../donnees/db.json', import.meta.url), 'utf8'),
);
const nouvellesCandidatures = [];

const ENTETES_CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function envoyer(res, statut, corps) {
  res.writeHead(statut, { 'Content-Type': 'application/json; charset=utf-8', ...ENTETES_CORS });
  res.end(JSON.stringify(corps));
}

// Recherche insensible aux accents et à la casse : « fes » trouve « Fès »
function normaliser(texte) {
  return texte.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

function listerOffres(params) {
  const q = normaliser(params.get('q') ?? '').trim();
  const city = params.get('city');
  const workMode = params.get('workMode');
  const skill = params.get('skill');

  let offres = db.offers.filter((o) => o.status === 'published');
  if (q) {
    offres = offres.filter((o) =>
      normaliser(`${o.title} ${o.companyName} ${o.city} ${o.skills.join(' ')}`).includes(q),
    );
  }
  if (city) offres = offres.filter((o) => o.city === city);
  if (workMode) offres = offres.filter((o) => o.workMode === workMode);
  if (skill) offres = offres.filter((o) => o.skills.includes(skill));
  // Les plus récentes d'abord
  offres.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));

  const limit = Math.min(Math.max(Number(params.get('limit')) || 12, 1), 50);
  const page = Math.max(Number(params.get('page')) || 1, 1);
  const debut = (page - 1) * limit;
  return { items: offres.slice(debut, debut + limit), total: offres.length, page, limit };
}

function toutesLesCandidatures() {
  return [...db.applications, ...nouvellesCandidatures];
}

// Mêmes règles que le formulaire React (S3) : le serveur revérifie tout.
function validerCandidature(corps) {
  const erreurs = {};
  const offre = db.offers.find((o) => o.id === corps.offerId);
  if (!offre) erreurs.offerId = 'Offre inconnue';
  else if (offre.status !== 'published') erreurs.offerId = 'Cette offre est fermée';
  if (!db.students.some((s) => s.id === corps.studentId)) erreurs.studentId = 'Étudiant inconnu';
  const motivation = typeof corps.motivation === 'string' ? corps.motivation.trim() : '';
  if (motivation.length < 100) erreurs.motivation = 'Au moins 100 caractères';
  if (motivation.length > 2000) erreurs.motivation = 'Au plus 2 000 caractères';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(corps.availableFrom ?? '')) erreurs.availableFrom = 'Date attendue au format AAAA-MM-JJ';
  if (corps.portfolioUrl) {
    // Seulement http ou https : une adresse « javascript:... » serait dangereuse (S9)
    const valide = URL.canParse(corps.portfolioUrl)
      && ['http:', 'https:'].includes(new URL(corps.portfolioUrl).protocol);
    if (!valide) erreurs.portfolioUrl = 'Adresse web invalide (elle doit commencer par http:// ou https://)';
  }
  return erreurs;
}

function lireCorps(req) {
  return new Promise((resolve, reject) => {
    let texte = '';
    req.on('data', (morceau) => {
      texte += morceau;
      if (texte.length > 100_000) reject(new Error('Corps trop gros'));
    });
    req.on('end', () => {
      try {
        resolve(texte ? JSON.parse(texte) : {});
      } catch {
        reject(new Error('JSON invalide'));
      }
    });
  });
}

const AIDE = `<!doctype html><meta charset="utf-8"><title>API simulée BabStage</title>
<style>body{font-family:system-ui;max-width:760px;margin:2rem auto;line-height:1.5}code{background:#eef}</style>
<h1>API simulée de BabStage</h1>
<p>Toutes les réponses sont en JSON. Essayez les liens :</p>
<ul>
<li><a href="/api/offers">/api/offers</a> : les offres publiées, 12 par page (<code>?q=react&amp;city=Rabat&amp;workMode=remote&amp;skill=Docker&amp;page=2&amp;limit=12</code>)</li>
<li><a href="/api/offers/o-0004">/api/offers/o-0004</a> : une offre, avec son entreprise</li>
<li><a href="/api/companies">/api/companies</a> et <code>/api/companies/c-01</code></li>
<li><a href="/api/applications?studentId=s-001">/api/applications?studentId=s-001</a> : les candidatures d'un étudiant</li>
<li><code>POST /api/applications</code> : envoyer une candidature (corps JSON : offerId, studentId, motivation, availableFrom, portfolioUrl)</li>
</ul>
<p>Ajoutez <code>?_panne=1</code> à une adresse pour simuler une panne du serveur.</p>`;

async function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const morceaux = url.pathname.split('/').filter(Boolean); // ['api', 'offers', 'o-0004']

  if (req.method === 'OPTIONS') {
    res.writeHead(204, ENTETES_CORS);
    return res.end();
  }
  if (url.searchParams.get('_panne') === '1' || Math.random() < PANNE) {
    return envoyer(res, 500, { message: 'Panne simulée du serveur' });
  }
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(AIDE);
  }
  if (morceaux[0] !== 'api') {
    return envoyer(res, 404, { message: `Adresse inconnue : ${url.pathname}` });
  }

  const [, ressource, id] = morceaux;

  if (req.method === 'GET' && ressource === 'offers' && !id) {
    return envoyer(res, 200, listerOffres(url.searchParams));
  }
  if (req.method === 'GET' && ressource === 'offers' && id) {
    const offre = db.offers.find((o) => o.id === id);
    if (!offre) return envoyer(res, 404, { message: `Offre ${id} introuvable` });
    const company = db.companies.find((c) => c.id === offre.companyId);
    return envoyer(res, 200, { ...offre, company });
  }
  if (req.method === 'GET' && ressource === 'companies') {
    if (!id) return envoyer(res, 200, db.companies);
    const entreprise = db.companies.find((c) => c.id === id);
    return entreprise
      ? envoyer(res, 200, entreprise)
      : envoyer(res, 404, { message: `Entreprise ${id} introuvable` });
  }
  if (req.method === 'GET' && ressource === 'applications') {
    const studentId = url.searchParams.get('studentId');
    const liste = toutesLesCandidatures()
      .filter((a) => !studentId || a.studentId === studentId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return envoyer(res, 200, liste);
  }
  if (req.method === 'POST' && ressource === 'applications' && !id) {
    let corps;
    try {
      corps = await lireCorps(req);
    } catch (e) {
      return envoyer(res, 400, { message: e.message });
    }
    const erreurs = validerCandidature(corps);
    if (Object.keys(erreurs).length > 0) {
      return envoyer(res, 422, { message: 'Candidature invalide', errors: erreurs });
    }
    const dejaFaite = toutesLesCandidatures().some(
      (a) => a.offerId === corps.offerId && a.studentId === corps.studentId && a.status !== 'withdrawn',
    );
    if (dejaFaite) {
      return envoyer(res, 409, { message: 'Vous avez déjà candidaté à cette offre' });
    }
    const aujourdhui = new Date().toISOString().slice(0, 10);
    const candidature = {
      id: `a-${String(db.applications.length + nouvellesCandidatures.length + 1).padStart(4, '0')}`,
      offerId: corps.offerId,
      studentId: corps.studentId,
      status: 'sent',
      createdAt: aujourdhui,
      statusHistory: [{ status: 'sent', at: aujourdhui }],
      motivation: corps.motivation.trim(),
      availableFrom: corps.availableFrom,
      portfolioUrl: corps.portfolioUrl || null,
    };
    nouvellesCandidatures.push(candidature);
    return envoyer(res, 201, candidature);
  }
  return envoyer(res, 404, { message: `Route inconnue : ${req.method} ${url.pathname}` });
}

const serveur = createServer((req, res) => {
  const debut = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - debut} ms)`);
  });
  let attente = req.method === 'OPTIONS' ? 0 : LATENCE;
  if (ALEATOIRE && attente > 0) attente = Math.round(Math.random() * 2 * LATENCE);
  setTimeout(() => {
    router(req, res).catch((e) => envoyer(res, 500, { message: e.message }));
  }, attente);
});

serveur.listen(PORT, () => {
  const latence = ALEATOIRE ? `aléatoire, 0 à ${2 * LATENCE} ms` : `${LATENCE} ms`;
  console.log(`API simulée BabStage : http://localhost:${PORT}  (latence ${latence}, pannes ${PANNE * 100} %)`);
});

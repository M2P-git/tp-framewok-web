// Les « vues » de la démo : des fonctions qui transforment des données en HTML (du texte).
//
// Ce fichier est utilisé des deux côtés :
//   - par le serveur (serveur.mjs), pour fabriquer les pages des versions MPA et SSR ;
//   - par le navigateur (client.mjs), pour fabriquer l'écran des versions SPA et SSR.
// C'est l'idée du rendu serveur : le même code d'affichage tourne sur le serveur
// pour le premier affichage, puis dans le navigateur. Next.js fait la même chose
// avec des composants React (S11).

// Transforme les caractères spéciaux du HTML, pour qu'un titre d'offre contenant
// « <script> » s'affiche comme du texte au lieu d'être exécuté (voir S2 : XSS).
export function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

export function heure() {
  return new Date().toLocaleTimeString('fr-FR', { hour12: false }) + '.'
    + String(new Date().getMilliseconds()).padStart(3, '0');
}

function gratification(offre) {
  return offre.stipendMad > 0
    ? `${offre.stipendMad.toLocaleString('fr-FR')} MAD par mois`
    : 'non rémunéré';
}

// Le bouton « favori ». En MPA, c'est un formulaire : chaque clic est une requête
// au serveur, qui renvoie une nouvelle page. En SPA et en SSR, c'est un simple
// bouton : JavaScript change l'état dans le navigateur, sans requête.
function boutonFavori(offre, mode, favoris) {
  const actif = favoris.has(offre.id);
  const etoile = actif ? '★' : '☆';
  if (mode === 'mpa') {
    return `<form class="form-favori" method="post" action="/mpa/favoris/${offre.id}">
        <button class="favori" aria-pressed="${actif}" title="Favori">${etoile}</button>
      </form>`;
  }
  return `<button type="button" class="favori" data-favori="${offre.id}" aria-pressed="${actif}" title="Favori">${etoile}</button>`;
}

// La liste des offres, avec le filtre par ville.
// Le filtre est un vrai formulaire (method="get") : sans JavaScript, il recharge
// la page, comme en MPA. Avec JavaScript (SPA, ou SSR après hydratation), le
// navigateur intercepte l'envoi et ne demande que des données.
export function vueListe({ offres, total, ville, villes, mode, favoris = new Set() }) {
  const options = villes.map((v) =>
    `<option${v === ville ? ' selected' : ''}>${echapper(v)}</option>`).join('');
  const cartes = offres.map((o) => `
    <li class="carte">
      <div>
        <a href="/${mode}/offres/${o.id}" data-lien>${echapper(o.title)}</a>
        <p class="entreprise">${echapper(o.companyName)} · ${echapper(o.city)} · ${gratification(o)}</p>
      </div>
      ${boutonFavori(o, mode, favoris)}
    </li>`).join('');
  return `
    <form class="filtre" method="get" action="/${mode}/offres">
      <label>Ville
        <select name="ville"><option value="">Toutes les villes</option>${options}</select>
      </label>
      <button>Filtrer</button>
      <span class="compte">${total} offre${total > 1 ? 's' : ''}${ville ? ` à ${echapper(ville)}` : ''} (12 premières)</span>
    </form>
    <ul class="offres">${cartes}</ul>`;
}

export function vueDetail({ offre, mode, favoris = new Set() }) {
  const competences = offre.skills.map((s) => `<li>${echapper(s)}</li>`).join('');
  return `
    <p><a href="/${mode}/offres" data-lien>← Toutes les offres</a></p>
    <article class="detail">
      <div class="titre-detail">
        <h2>${echapper(offre.title)}</h2>
        ${boutonFavori(offre, mode, favoris)}
      </div>
      <p class="entreprise">${echapper(offre.companyName)} · ${echapper(offre.city)}
        · ${offre.durationMonths} mois · ${gratification(offre)}</p>
      <ul class="competences">${competences}</ul>
      <p>${echapper(offre.description)}</p>
    </article>`;
}

export function vueErreur(message, mode) {
  return `<p class="erreur">${echapper(message)}</p><p><a href="/${mode}/offres" data-lien>← Toutes les offres</a></p>`;
}

// Le « témoin » : qui a fabriqué le HTML affiché, et quand ?
export function vueTemoin(qui) {
  return `HTML fabriqué par <strong>${qui}</strong> à ${heure()}`;
}

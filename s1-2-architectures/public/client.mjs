// Le code du navigateur, commun aux versions SPA et SSR.
//
// SPA : la page arrive vide ; ce code demande les données (JSON) et fabrique l'écran.
// SSR : la page arrive déjà remplie par le serveur ; ce code ne refait pas l'écran,
//       il « l'hydrate » : il branche les clics sur le HTML existant.
// Ensuite, dans les deux cas, chaque clic ne demande plus que des données.

import { vueListe, vueDetail, vueErreur, vueTemoin } from '/commun/vues.mjs';

const racine = document.querySelector('#root');
const temoin = document.querySelector('#temoin');
const favoris = new Set(); // l'état des favoris vit dans le navigateur

let villes = [];

// Lit l'adresse (/spa/offres/o-0004, /spa/offres?ville=Rabat) et affiche l'écran qui correspond.
async function afficher(mode) {
  const morceaux = location.pathname.split('/').filter(Boolean); // ['spa', 'offres', 'o-0004']
  const id = morceaux[2];
  const ville = new URLSearchParams(location.search).get('ville') ?? '';
  racine.innerHTML = '<p class="chargement">Chargement…</p>';
  try {
    if (villes.length === 0) villes = await lireJson('/api/villes');
    if (id) {
      const offre = await lireJson(`/api/offers/${id}`);
      racine.innerHTML = vueDetail({ offre, mode, favoris });
      document.title = `${offre.title} · ${mode.toUpperCase()}`;
    } else {
      const { items, total } = await lireJson(`/api/offers?ville=${encodeURIComponent(ville)}`);
      racine.innerHTML = vueListe({ offres: items, total, ville, villes, mode, favoris });
      document.title = `Offres · ${mode.toUpperCase()}`;
    }
  } catch (erreur) {
    racine.innerHTML = vueErreur(erreur.message, mode);
  }
  temoin.innerHTML = vueTemoin('le navigateur (JavaScript)');
}

async function lireJson(adresse) {
  const reponse = await fetch(adresse);
  if (!reponse.ok) throw new Error(`Erreur ${reponse.status} pour ${adresse}`);
  return reponse.json();
}

// Change l'adresse sans recharger la page, puis affiche le nouvel écran.
function naviguer(adresse, mode) {
  history.pushState({}, '', adresse);
  afficher(mode);
}

export function demarrer({ mode, dejaRendu }) {
  // Un seul écouteur pour tous les clics de la page (délégation d'événements) :
  // il fonctionne aussi pour les éléments ajoutés plus tard.
  document.addEventListener('click', (evenement) => {
    const lien = evenement.target.closest('a[data-lien]');
    if (lien) {
      evenement.preventDefault(); // pas de rechargement : on garde la page
      naviguer(lien.getAttribute('href'), mode);
      return;
    }
    const bouton = evenement.target.closest('[data-favori]');
    if (bouton) {
      const id = bouton.dataset.favori;
      if (favoris.has(id)) favoris.delete(id); else favoris.add(id);
      bouton.textContent = favoris.has(id) ? '★' : '☆';
      bouton.setAttribute('aria-pressed', String(favoris.has(id)));
    }
  });

  document.addEventListener('submit', (evenement) => {
    const formulaire = evenement.target.closest('form.filtre');
    if (!formulaire) return;
    evenement.preventDefault();
    const ville = new FormData(formulaire).get('ville');
    naviguer(`/${mode}/offres${ville ? `?ville=${encodeURIComponent(ville)}` : ''}`, mode);
  });

  // Boutons Précédent et Suivant du navigateur
  window.addEventListener('popstate', () => afficher(mode));

  if (dejaRendu) {
    // SSR : l'écran est déjà là. On récupère les données envoyées avec la page,
    // sans refaire de requête, et on signale que la page est devenue interactive.
    const donnees = JSON.parse(document.querySelector('#donnees').textContent);
    villes = donnees.villes;
    const badge = document.querySelector('#hydratation');
    badge.textContent = '✓ Page hydratée : les boutons répondent maintenant.';
    badge.classList.add('ok');
  } else {
    afficher(mode);
  }
}

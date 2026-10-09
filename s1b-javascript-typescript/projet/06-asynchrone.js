// Exercice P.6 : parler au serveur (promesses, async et await, erreurs)
//
// L'application ne lit pas un fichier : elle demande des données à un serveur, qui répond plus
// tard, parfois lentement, parfois pas du tout. Ces fonctions reçoivent un objet `api` dont les
// méthodes renvoient des promesses (dans les tests, une fausse API ; en S3, la vraie).
//
// 1. chargerPageSalon(slug, api) : la page d'un salon a besoin de deux choses, indépendantes :
//    api.getEtablissement(slug) et api.getAvis(slug). Lancez les deux EN MÊME TEMPS (Promise.all),
//    et renvoyez { etablissement, avis }. Si l'une échoue, la fonction échoue.
// 2. avecDelaiMax(promesse, ms) : renvoie une promesse qui donne le résultat de `promesse` si elle
//    répond à temps, et qui échoue avec new Error('Délai dépassé') au bout de `ms` millisecondes
//    sinon. Indice : Promise.race, et une promesse qui échoue après un setTimeout.
// 3. reessayer(fonction, essais) : appelle la fonction asynchrone `fonction()` ; si elle échoue,
//    recommence, jusqu'à `essais` appels au total. Renvoie le premier résultat obtenu ; si tous
//    les appels échouent, relance la DERNIÈRE erreur.
// 4. reserver(api, demande) : appelle api.creerRendezVous(demande).
//    - succès : renvoie { ok: true, rendezVous } ;
//    - erreur avec erreur.status === 409 (le créneau vient d'être pris par quelqu'un d'autre) :
//      renvoie { ok: false, raison: 'creneau-pris' } ;
//    - erreur avec erreur.status === 422 (formulaire refusé par le serveur) :
//      renvoie { ok: false, raison: 'invalide', erreurs: erreur.erreurs } ;
//    - toute autre erreur (panne, réseau) : on la laisse remonter (throw).
//
// Vérifier : node --test projet/06-asynchrone.test.js

export async function chargerPageSalon(slug, api) {
  // À écrire
}

export function avecDelaiMax(promesse, ms) {
  // À écrire
}

export async function reessayer(fonction, essais) {
  // À écrire
}

export async function reserver(api, demande) {
  // À écrire
}

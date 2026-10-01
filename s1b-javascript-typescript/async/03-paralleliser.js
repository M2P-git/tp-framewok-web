// Exercice AS.3 : paralléliser
//
// `api.offre(id)` renvoie une promesse (une offre), et met un certain temps à répondre.
//
// 1. chargerEnParallele(ids, api) : charge toutes les offres EN MÊME TEMPS, et renvoie le tableau
//    des offres dans le MÊME ORDRE que les identifiants. Si une requête échoue, tout échoue
//    (l'erreur est transmise). Indice : Promise.all et map.
//    (Charger les offres l'une après l'autre prendrait la somme des temps : le test le détecte.)
// 2. chargerSansEchec(ids, api) : charge toutes les offres en parallèle sans qu'un échec arrête
//    les autres, et renvoie { reussies: [offres...], echecs: [ids qui ont échoué...] }, chacun
//    dans l'ordre des identifiants. Indice : Promise.allSettled.
//
// Vérifier : node --test async/03-paralleliser.test.js

export async function chargerEnParallele(ids, api) {
  // À écrire
}

export async function chargerSansEchec(ids, api) {
  // À écrire
}

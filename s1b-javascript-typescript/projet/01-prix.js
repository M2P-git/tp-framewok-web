// Exercice P.1 : les prix et les durées (les données dérivées)
//
// Sur la page d'un salon, le client choisit une ou plusieurs prestations. En haut de l'écran,
// un résumé se met à jour : « 2 prestations · 230 DH · 1 h 15 ». Ce résumé n'est jamais STOCKÉ :
// il est CALCULÉ à partir de la sélection. C'est la notion de « donnée dérivée », au cœur de React.
// Ces fonctions iront telles quelles dans votre application (src/lib/prix.js), en S2.
//
// 1. formaterPrix(prix) : 150 -> '150 DH' ; 0 -> 'Offert' (une prestation gratuite existe !).
//    Au-delà de 999, le séparateur des milliers est celui du français : pensez à toLocaleString('fr-FR').
// 2. formaterDuree(minutes) : 45 -> '45 min' ; 60 -> '1 h' ; 90 -> '1 h 30' ; 65 -> '1 h 05'.
// 3. totalSelection(prestations) : { prix, duree }, la somme des priceMad et des durationMinutes.
//    Liste vide : { prix: 0, duree: 0 }. Indice : reduce.
// 4. resumeSelection(prestations) : '' si la liste est vide ; sinon, par exemple,
//    '1 prestation · 150 DH · 45 min' ou '2 prestations · 230 DH · 1 h 15' (attention à l'accord).
//    Le séparateur est « · » (point médian), entouré d'espaces.
//
// Vérifier : node --test projet/01-prix.test.js

export function formaterPrix(prix) {
  // À écrire
}

export function formaterDuree(minutes) {
  // À écrire
}

export function totalSelection(prestations) {
  // À écrire
}

export function resumeSelection(prestations) {
  // À écrire
}

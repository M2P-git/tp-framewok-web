// Exercice P.2 : la sélection du client (l'immutabilité)
//
// La sélection est une liste d'identifiants de prestations : ['sv-001', 'sv-006'].
// En React, on ne MODIFIE jamais l'état : on en fabrique une NOUVELLE version. Si vous écrivez
// selection.push(...) ou selection.splice(...), React ne voit pas le changement, et l'écran
// ne se met pas à jour. Les tests « gèlent » les tableaux (Object.freeze) : toute modification
// lève une erreur.
//
// 1. basculer(selection, id) : une NOUVELLE liste ; retire id s'il y est, l'ajoute à la fin sinon.
// 2. estSelectionnee(selection, id) : true ou false.
// 3. prestationsChoisies(prestations, selection) : les objets prestation, dans l'ordre de la
//    sélection ; un identifiant inconnu est ignoré.
// 4. retirerIndisponibles(selection, prestations) : une NOUVELLE liste, sans les identifiants
//    inconnus ni ceux des prestations inactives (active: false). Utile quand un salon retire une
//    prestation pendant que le client hésite.
//
// Vérifier : node --test projet/02-selection.test.js

export function basculer(selection, id) {
  // À écrire
}

export function estSelectionnee(selection, id) {
  // À écrire
}

export function prestationsChoisies(prestations, selection) {
  // À écrire
}

export function retirerIndisponibles(selection, prestations) {
  // À écrire
}

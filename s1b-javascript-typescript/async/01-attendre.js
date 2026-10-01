// Exercice AS.1 : attendre
//
// Une promesse représente un résultat qui n'est pas encore arrivé.
//
// 1. attendre(ms) : renvoie une promesse qui se tient au bout de ms millisecondes (sans valeur).
// 2. avecDelai(valeur, ms) : renvoie une promesse qui donne `valeur` au bout de ms millisecondes.
// 3. avecTimeout(promesse, ms) : renvoie une promesse qui donne le résultat de `promesse` si elle se
//    tient en moins de ms millisecondes ; sinon, elle est ROMPUE avec Error('Délai dépassé').
//    Si `promesse` est rompue, l'erreur est transmise telle quelle.
//    Indice : Promise.race([...]) donne le résultat de la première promesse qui se termine.
//
// Vérifier : node --test async/01-attendre.test.js

export function attendre(ms) {
  // À écrire
}

export function avecDelai(valeur, ms) {
  // À écrire
}

export function avecTimeout(promesse, ms) {
  // À écrire
}

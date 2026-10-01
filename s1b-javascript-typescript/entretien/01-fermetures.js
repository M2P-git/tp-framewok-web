// Exercice EN.1 : deux classiques sur les fermetures
//
// 1. once(fonction) : renvoie une fonction qui n'appelle `fonction` QU'UNE SEULE FOIS. Les appels
//    suivants ne la rappellent pas et renvoient le résultat du PREMIER appel.
//    Les arguments du premier appel sont transmis à `fonction`.
// 2. memoiser(fonction) : renvoie une fonction qui garde en mémoire les résultats déjà calculés.
//    Si on l'appelle une seconde fois avec les MÊMES arguments, elle renvoie le résultat gardé
//    sans rappeler `fonction`. Indice : une clé JSON.stringify(arguments) dans un objet ou une Map.
//
// Les deux reposent sur une variable que la fonction renvoyée « garde » : une fermeture.
//
// Vérifier : node --test entretien/01-fermetures.test.js

export function once(fonction) {
  // À écrire
}

export function memoiser(fonction) {
  // À écrire
}

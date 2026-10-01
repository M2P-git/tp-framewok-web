// Exercice EN.3 : trois classiques de code en direct
//
// 1. aplatir(tableau) : met à plat un tableau de tableaux, à TOUTE profondeur, sans modifier l'original.
//      aplatir([1, [2, [3, [4]]], 5]) donne [1, 2, 3, 4, 5]
//    N'utilisez pas flat(Infinity) : écrivez la RÉCURSION (une fonction qui s'appelle elle-même).
//    Indice : Array.isArray pour savoir si un élément est un tableau.
// 2. decouper(tableau, taille) : découpe en morceaux de `taille` éléments (le dernier peut être plus petit).
//      decouper([1, 2, 3, 4, 5], 2) donne [[1, 2], [3, 4], [5]]
// 3. estPalindrome(texte) : vrai si le texte se lit pareil dans les deux sens, en ignorant les majuscules,
//    les espaces et la ponctuation ; les accents comptent comme la lettre (é = e).
//      estPalindrome('Esope reste ici et se repose') est vrai.
//
// Vérifier : node --test entretien/03-recursion.test.js

export function aplatir(tableau) {
  // À écrire
}

export function decouper(tableau, taille) {
  // À écrire
}

export function estPalindrome(texte) {
  // À écrire
}

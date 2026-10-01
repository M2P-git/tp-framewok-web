// Exercice RE.2 : les données dérivées
//
// En React, on ne STOCKE pas ce qu'on peut CALCULER : la liste visible est calculée, à chaque affichage,
// à partir de l'état (les offres, la recherche, la ville...).
//
// 1. filtrerOffres(offres, { q, city, workMode }) : les offres visibles.
//    - q : un texte cherché dans le titre OU le nom de l'entreprise (companyName), sans tenir compte
//      des majuscules ; '' ne filtre rien ;
//    - city : '' = toutes les villes, sinon la ville exacte ;
//    - workMode : '' = tous les modes, sinon le mode exact.
//    Les offres gardent leur ordre.
// 2. villesDisponibles(offres) : les villes sans doublon, triées en ordre alphabétique FRANÇAIS
//    (Fès doit venir entre Casablanca et Rabat : pensez à localeCompare). Ne modifiez pas `offres`.
// 3. page(offres, numero, parPage) : les offres de la page `numero` (la première page est la 1).
//
// Vérifier : node --test react/02-donnees-derivees.test.js

export function filtrerOffres(offres, filtres) {
  // À écrire
}

export function villesDisponibles(offres) {
  // À écrire
}

export function page(offres, numero, parPage) {
  // À écrire
}

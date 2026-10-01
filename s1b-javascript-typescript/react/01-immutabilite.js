// Exercice RE.1 : l'immutabilité, comme React l'exige
//
// En React, on ne MODIFIE jamais l'état : on en fabrique une NOUVELLE version. React compare
// l'ancienne et la nouvelle (par adresse) pour savoir ce qui a changé.
// Aucune de ces fonctions ne doit modifier ce qu'elle reçoit (les tests passent des données gelées).
//
// 1. ajouterFavori(favoris, id)  : un nouveau tableau avec l'id en plus (rien de plus s'il y est déjà).
// 2. retirerFavori(favoris, id)  : un nouveau tableau sans cet id.
// 3. basculerFavori(favoris, id) : le retire s'il y est, l'ajoute sinon.
// 4. mettreAJourOffre(offres, id, changements) : un nouveau tableau où l'offre qui a cet id est
//    remplacée par une COPIE avec les changements. Les AUTRES offres doivent rester les mêmes objets
//    (la même adresse) : c'est ce qui permet à React de ne redessiner que ce qui a changé.
//
// Vérifier : node --test react/01-immutabilite.test.js

export function ajouterFavori(favoris, id) {
  // À écrire
}

export function retirerFavori(favoris, id) {
  // À écrire
}

export function basculerFavori(favoris, id) {
  // À écrire
}

export function mettreAJourOffre(offres, id, changements) {
  // À écrire
}

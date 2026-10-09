// Exercice P.3 : le catalogue d'un salon (filtrer, regrouper, trier)
//
// La page d'un salon affiche ses prestations regroupées (Coupe, Couleur, Soins), avec un champ
// de recherche, un menu de groupes et un tri. Tout cela se CALCULE à partir de la liste brute :
// on ne garde jamais une « liste filtrée » à côté de la liste d'origine.
//
// 1. normaliser(texte) : en minuscules et sans accents : 'Mèches' -> 'meches'.
//    Indice : texte.normalize('NFD').replace(/\p{Diacritic}/gu, '').
// 2. filtrerPrestations(prestations, { q, groupe }) : seulement les prestations ACTIVES ;
//    q est cherché dans le nom, sans tenir compte des majuscules ni des accents ('' ne filtre rien) ;
//    groupe : '' = tous les groupes, sinon le groupe exact. L'ordre d'origine est gardé.
// 3. grouperParGroupe(prestations) : [{ groupe: 'Coupe', prestations: [...] }, ...], les groupes
//    dans l'ordre de leur première apparition.
// 4. trierPrestations(prestations, critere) : une NOUVELLE liste triée par 'prix' (croissant),
//    'duree' (croissante) ou 'nom' (ordre alphabétique français : localeCompare). À égalité,
//    l'ordre d'origine est gardé. La liste d'origine ne doit pas changer.
// 5. prixAPartirDe(prestations) : le plus petit prix des prestations actives, ou null s'il n'y en
//    a aucune. Attention : une prestation gratuite coûte 0, et 0 est une vraie réponse.
//
// Vérifier : node --test projet/03-catalogue.test.js

export function normaliser(texte) {
  // À écrire
}

export function filtrerPrestations(prestations, { q, groupe }) {
  // À écrire
}

export function grouperParGroupe(prestations) {
  // À écrire
}

export function trierPrestations(prestations, critere) {
  // À écrire
}

export function prixAPartirDe(prestations) {
  // À écrire
}

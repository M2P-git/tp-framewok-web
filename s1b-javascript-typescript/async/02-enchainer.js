// Exercice AS.2 : enchaîner deux appels
//
// `api` est un objet avec deux fonctions qui renvoient des promesses :
//   api.offre(id)         -> une offre { id, title, companyId }
//   api.entreprise(id)    -> une entreprise { id, name }
//
// 1. chargerOffreEtEntreprise(id, api) : charge l'offre, PUIS l'entreprise indiquée par
//    offre.companyId (le second appel dépend du premier), et renvoie l'offre complétée :
//    { ...offre, entreprise }.
//    Si api.offre est rompue, l'erreur est transmise et api.entreprise n'est PAS appelée.
// 2. chargerOuDefaut(id, api, defaut) : renvoie l'offre, ou `defaut` si le chargement échoue
//    (une erreur ne doit jamais sortir de cette fonction). Utilisez try / catch.
//
// Écrivez-les avec async / await.
//
// Vérifier : node --test async/02-enchainer.test.js

export async function chargerOffreEtEntreprise(id, api) {
  // À écrire
}

export async function chargerOuDefaut(id, api, defaut) {
  // À écrire
}

// Exercice AS.5 : des rappels aux promesses
//
// Beaucoup de fonctions anciennes (surtout dans Node.js) fonctionnent avec un RAPPEL (callback)
// « à la Node » : le dernier argument est une fonction (erreur, valeur) => ...
//   lireOffre('o-1', (erreur, offre) => { ... })
//
// Écrivez promettre(fonction) : elle reçoit une fonction de ce style et renvoie une NOUVELLE
// fonction, qui prend les mêmes arguments (sans le rappel) et renvoie une PROMESSE :
//   - tenue avec la valeur, quand le rappel reçoit (null, valeur) ;
//   - rompue avec l'erreur, quand le rappel reçoit une erreur.
//
//   const lireOffrePromesse = promettre(lireOffre);
//   const offre = await lireOffrePromesse('o-1');
//
// Indice : new Promise((resolve, reject) => { ... }).
// (Node.js a un outil pour cela, util.promisify : ici, vous le réécrivez.)
//
// Vérifier : node --test async/05-promettre.test.js

export function promettre(fonction) {
  // À écrire
}

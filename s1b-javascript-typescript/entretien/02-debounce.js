// Exercice EN.2 : debounce
//
// L'anti-rebond (debounce) est une question d'entretien classique, et vous l'utiliserez en S3 pour la
// recherche : on n'interroge le serveur qu'à la FIN de la frappe.
//
// debounce(fonction, ms) renvoie une fonction qui, à chaque appel, repart de zéro : `fonction` n'est
// appelée que si ms millisecondes se sont écoulées SANS nouvel appel. Elle est alors appelée avec les
// arguments du DERNIER appel.
//   const chercher = debounce((texte) => console.log(texte), 300);
//   chercher('r'); chercher('re'); chercher('rea');   // 300 ms plus tard : affiche 'rea' (une seule fois)
//
// Indice : setTimeout et clearTimeout, et une variable que la fonction renvoyée garde (une fermeture).
//
// Vérifier : node --test entretien/02-debounce.test.js

export function debounce(fonction, ms) {
  // À écrire
}

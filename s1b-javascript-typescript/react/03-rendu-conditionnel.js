// Exercice RE.3 : décider quoi afficher
//
// En React, on décrit l'écran pour chaque situation : chargement, erreur, liste vide, liste pleine.
// Ici, on écrit les TEXTES de ces situations (en React, ce seront des morceaux de JSX).
//
// 1. texteEtat({ chargement, erreur, offres }) :
//      chargement vrai            -> 'Chargement…'
//      sinon une erreur (texte)   -> 'Erreur : ' suivi du message
//      sinon aucune offre         -> 'Aucune offre'
//      sinon                      -> '1 offre' ou '3 offres' (bien accordé : pas de s pour 1)
//    Testez dans cet ordre : le chargement passe avant l'erreur, l'erreur avant la liste vide.
// 2. etiquetteGratification(offre) :
//      stipendMad absent (undefined ou null) -> 'non précisée'
//      0                                      -> 'non rémunéré'    (attention : 0 est une vraie valeur !)
//      sinon                                  -> '3000 MAD'
// 3. nomEntreprise(offre) : offre.company?.name, ou 'entreprise inconnue' s'il n'y a pas d'entreprise.
//
// Vérifier : node --test react/03-rendu-conditionnel.test.js

export function texteEtat({ chargement, erreur, offres }) {
  // À écrire
}

export function etiquetteGratification(offre) {
  // À écrire
}

export function nomEntreprise(offre) {
  // À écrire
}

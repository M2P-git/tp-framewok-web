// Exercice P.5 : l'agenda du pro (les objets et la machine à états)
//
// Un rendez-vous change de statut au fil du temps. Toutes les transitions ne sont pas permises :
//
//   pending (en attente) ──> confirmed (confirmé) ──> completed (honoré)
//          │                        │           └──> no_show (absent)
//          └──> cancelled <─────────┘
//
// Une fois honoré, absent ou annulé, un rendez-vous ne bouge plus. Ces règles s'appellent une
// « machine à états » ; l'interface s'en sert pour n'afficher que les boutons permis, et le
// serveur les revérifie (on ne fait jamais confiance au navigateur).
//
// 1. rendezVousDuJour(rdvs, date) : les rendez-vous qui commencent ce jour-là ('2026-10-06'),
//    triés par heure de début, sans modifier la liste d'origine.
// 2. peutPasser(de, vers) : true si la transition est permise (utilisez TRANSITIONS).
// 3. changerStatut(rdv, vers, maintenant) : un NOUVEL objet rendez-vous, avec status = vers et
//    updatedAt = maintenant ; l'original ne change pas. Si la transition est interdite, lève
//    une erreur : throw new Error(`Impossible de passer de « ${de} » à « ${vers} »`).
// 4. statistiques(rdvs) : {
//      total,                       // le nombre de rendez-vous
//      parStatut,                   // { pending, confirmed, completed, cancelled, no_show } : tous présents, même à 0
//      chiffreAffaires,             // la somme des priceMad des rendez-vous HONORÉS seulement
//      tauxAbsence,                 // no_show / (completed + no_show), arrondi à 2 décimales ; 0 si aucun
//    }
//
// Vérifier : node --test projet/05-agenda.test.js

export const TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'no_show', 'cancelled'],
  completed: [],
  no_show: [],
  cancelled: [],
};

export function rendezVousDuJour(rdvs, date) {
  // À écrire
}

export function peutPasser(de, vers) {
  // À écrire
}

export function changerStatut(rdv, vers, maintenant) {
  // À écrire
}

export function statistiques(rdvs) {
  // À écrire
}

// Exercice P.4 : les créneaux libres (le cœur métier de Mawid)
//
// Le client a choisi une prestation de 30 minutes. Le salon est ouvert de 10:00 à 13:00, puis de
// 14:00 à 20:00 ; les créneaux commencent tous les quarts d'heure ; l'employée a déjà deux
// rendez-vous. Quels horaires peut-on proposer ? C'est LA question de toute application de
// réservation. On la résout avec des fonctions pures : mêmes entrées, même sortie, faciles à tester.
//
// Les heures s'écrivent 'HH:MM'. Pour calculer, on les convertit en minutes depuis minuit.
//
// 1. enMinutes('09:30') -> 570.
// 2. enHeure(570) -> '09:30' (toujours deux chiffres : padStart).
// 3. seChevauchent(a, b) : a et b sont des intervalles { debut, fin } en minutes ; true s'ils se
//    recouvrent. Deux rendez-vous qui se touchent (l'un finit à 10:45, l'autre commence à 10:45)
//    ne se chevauchent PAS.
// 4. genererCreneaux(plages, duree, pas) : plages = [['10:00', '13:00'], ['14:00', '20:00']] ;
//    tous les débuts possibles, de `pas` en `pas` minutes depuis le début de chaque plage, tels que
//    la prestation (de `duree` minutes) se termine au plus tard à la fin de la plage.
//    Résultat : une liste d'heures 'HH:MM', dans l'ordre.
// 5. creneauxLibres(plages, occupes, duree, pas) : occupes = [{ debut: '10:00', fin: '10:45' }, ...]
//    (en 'HH:MM') ; les créneaux de genererCreneaux qui ne chevauchent aucun rendez-vous occupé.
// 6. jourDeLaSemaine('2026-10-06') -> 'tue' : la clé du jour dans openingHours
//    ('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'). Piège : new Date('2026-10-06') est minuit
//    en temps UNIVERSEL ; getDay() lit l'heure LOCALE et peut se tromper de jour selon le fuseau.
//    Utilisez getUTCDay().
//
// Vérifier : node --test projet/04-creneaux.test.js

export function enMinutes(heure) {
  // À écrire
}

export function enHeure(minutes) {
  // À écrire
}

export function seChevauchent(a, b) {
  // À écrire
}

export function genererCreneaux(plages, duree, pas) {
  // À écrire
}

export function creneauxLibres(plages, occupes, duree, pas) {
  // À écrire
}

export function jourDeLaSemaine(date) {
  // À écrire
}

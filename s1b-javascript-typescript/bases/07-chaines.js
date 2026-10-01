// Exercice BS.7 : des textes
//
// 1. resumeOffre(offre) : 'PFE : API de paiement · Rabat · 3000 MAD' (avec un gabarit `...${...}`).
//    Les trois parties sont title, city et stipendMad, séparées par ' · '.
// 2. initiales(nom) : 'Othmane Ziani' donne 'OZ'.
// 3. slugifier(titre) : minuscules, sans accents, tout ce qui n'est ni lettre ni chiffre devient un
//    tiret, pas de tiret au début ni à la fin : 'PFE : Moteur de recherche' donne 'pfe-moteur-de-recherche'.
//    Indice pour les accents : normalize('NFD') sépare la lettre de son accent ; cherchez sur MDN
//    comment retirer ensuite les accents séparés.
//
// Vérifier : node --test bases/07-chaines.test.js

export function resumeOffre(offre) {
  // À écrire
}

export function initiales(nom) {
  // À écrire
}

export function slugifier(titre) {
  // À écrire
}

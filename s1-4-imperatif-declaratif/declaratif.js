// TP S1.4 : du comment au quoi.
// Réécrivez chaque fonction en style déclaratif : pas de for, pas de while, pas de let.

// a. les catégories (champ group) des prestations, sans doublon.
// Version impérative :
//   const groupes = [];
//   for (const p of prestations) { if (!groupes.includes(p.group)) groupes.push(p.group); }
//   return groupes;
export function groupes(prestations) {
  throw new Error('à écrire');
}

// b. le prix total des prestations (champ priceMad).
// Version impérative :
//   let total = 0;
//   for (const p of prestations) { total += p.priceMad; }
//   return total;
export function totalPrix(prestations) {
  throw new Error('à écrire');
}

// c. au moins une prestation est-elle choisie ? (selection est un Set d'identifiants)
// Version impérative :
//   let aChoisie = false;
//   for (const p of prestations) { if (selection.has(p.id)) { aChoisie = true; break; } }
//   return aChoisie;
export function aUneChoisie(prestations, selection) {
  throw new Error('à écrire');
}

// TP S1.4 : du comment au quoi.
// Réécrivez chaque fonction en style déclaratif : pas de for, pas de while, pas de let.

// a. les villes, sans doublon.
// Version impérative :
//   const villes = [];
//   for (const o of offres) { if (!villes.includes(o.city)) villes.push(o.city); }
//   return villes;
export function villes(offres) {
  throw new Error('à écrire');
}

// b. le total des gratifications (champ stipendMad).
// Version impérative :
//   let total = 0;
//   for (const o of offres) { total += o.stipendMad; }
//   return total;
export function totalGratifications(offres) {
  throw new Error('à écrire');
}

// c. y a-t-il au moins un favori ? (favoris est un Set d'identifiants)
// Version impérative :
//   let aFavori = false;
//   for (const o of offres) { if (favoris.has(o.id)) { aFavori = true; break; } }
//   return aFavori;
export function aUnFavori(offres, favoris) {
  throw new Error('à écrire');
}

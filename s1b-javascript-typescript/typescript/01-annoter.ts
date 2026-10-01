// Exercice TS.1 : annoter
//
// Ce fichier ne compile pas en mode strict : les paramètres n'ont pas de type
// (« Parameter 'x' implicitly has an 'any' type »).
// Ajoutez le type de chaque paramètre (et du résultat, quand c'est utile) pour qu'il compile.
//
// Deux règles :
//   - les usages corrects, plus bas, doivent continuer à compiler ;
//   - les lignes précédées de « @ts-expect-error » doivent être REFUSÉES par TypeScript.
//     Si TypeScript ne les refuse pas, il le signale : « Unused '@ts-expect-error' directive ».
//
// Vérifier : npm run ts 1   (ou coller le fichier dans le TypeScript Playground)

type Offer = { id: string; title: string; city: string; stipendMad: number };

export function titreMajuscule(offre) {
  return offre.title.toUpperCase();
}

export function total(a, b) {
  return a + b;
}

export function estGratuite(offre) {
  return offre.stipendMad === 0;
}

export function villes(offres) {
  return offres.map((o) => o.city);
}

export function formater(montant, devise = 'MAD') {
  return `${montant} ${devise}`;
}

// ---- Usages corrects : ils doivent compiler ----
const o: Offer = { id: 'o-1', title: 'PFE : API', city: 'Rabat', stipendMad: 0 };
titreMajuscule(o);
total(1, 2);
estGratuite(o);
villes([o]);
formater(3000);
formater(3000, 'EUR');

// ---- Usages faux : TypeScript doit les refuser ----
// @ts-expect-error  un texte n'est pas un nombre
total('3', 4);
// @ts-expect-error  un nombre n'est pas une offre
titreMajuscule(42);
// @ts-expect-error  le montant doit être un nombre
formater('trois mille');

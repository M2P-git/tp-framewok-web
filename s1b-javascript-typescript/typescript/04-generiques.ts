// Exercice TS.4 : des fonctions génériques
//
// Un GÉNÉRIQUE est un type laissé « en blanc », précisé à l'usage : Array<T>, Promise<T>, useState<T>.
// Ces trois fonctions marchent déjà en JavaScript, mais TypeScript ne sait pas ce qu'elles renvoient
// (« implicitly has an 'any' type »). Écrivez leur signature avec un paramètre de type <T> :
//
//   premier(liste)           : le premier élément, ou undefined si la liste est vide ;
//   dernier(liste)           : le dernier élément, ou undefined ;
//   grouperPar(liste, cle)   : un objet qui range les éléments par la valeur (un texte) de cle(élément).
//
// Les lignes précédées de « @ts-expect-error » doivent être REFUSÉES par TypeScript.
//
// Vérifier : npm run ts 4   (compile, puis lance les tests de 04-generiques.test.ts)

export function premier(liste) {
  return liste[0];
}

export function dernier(liste) {
  return liste[liste.length - 1];
}

export function grouperPar(liste, cle) {
  const groupes = {};
  for (const x of liste) {
    const k = cle(x);
    (groupes[k] ??= []).push(x);
  }
  return groupes;
}

// ---- Usages : TypeScript doit deviner les types ----
type Offer = { id: string; city: string };
const offres: Offer[] = [
  { id: 'o-1', city: 'Rabat' },
  { id: 'o-2', city: 'Fès' },
  { id: 'o-3', city: 'Rabat' },
];

export const p: number | undefined = premier([1, 2, 3]);
export const d: string | undefined = dernier(['a', 'b']);
export const groupes: Record<string, Offer[]> = grouperPar(offres, (o) => o.city);

// @ts-expect-error  le premier d'une liste de nombres n'est pas un texte
export const mauvais: string | undefined = premier([1, 2, 3]);
// @ts-expect-error  cle reçoit une offre : 'city' existe, 'ville' n'existe pas
export const faux = grouperPar(offres, (o) => o.ville);

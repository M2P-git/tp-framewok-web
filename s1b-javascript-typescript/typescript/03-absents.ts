// Exercice TS.3 : les valeurs absentes
//
// Ce fichier ne compile pas : chaque fonction lit une valeur qui peut être absente
// (« 'x' is possibly 'undefined' », « 'x' is possibly 'null' »).
// Corrigez chaque fonction SANS changer sa signature (ne touchez pas aux types des paramètres),
// en testant la valeur avant de s'en servir (?., ??, if).
//
// Comportement attendu :
//   nbCompetences      : le nombre de compétences, 0 s'il n'y en a pas ;
//   nomEntreprise      : le nom de l'entreprise, 'inconnue' s'il n'y en a pas ;
//   titreOuDefaut      : le titre de l'offre qui a cet id, 'introuvable' si elle n'existe pas ;
//   longueur           : la longueur du texte, 0 pour null.
//
// Vérifier : npm run ts 3   (compile, puis lance les tests de 03-absents.test.ts)

export type Offer = {
  id: string;
  title: string;
  skills?: string[];
  company?: { name: string };
};

export function nbCompetences(offre: Offer): number {
  return offre.skills.length;
}

export function nomEntreprise(offre: Offer): string {
  return offre.company.name;
}

export function titreOuDefaut(offres: Offer[], id: string): string {
  const trouvee = offres.find((o) => o.id === id);
  return trouvee.title;
}

export function longueur(valeur: string | null): number {
  return valeur.length;
}

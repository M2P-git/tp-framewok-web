// Exercice TS.2 : décrire des données
//
// Remplacez les deux types ci-dessous :
//   - WorkMode : une UNION des trois textes 'onsite', 'hybrid' et 'remote' ;
//   - Offer : un objet avec id (texte), title (texte), city (texte), workMode (un WorkMode),
//     stipendMad (nombre) et skills, un tableau de textes FACULTATIF.
//
// Les lignes précédées de « @ts-expect-error » doivent être REFUSÉES par TypeScript.
//
// Vérifier : npm run ts 2

type WorkMode = string; // À remplacer
type Offer = Record<string, unknown>; // À remplacer

export const o1: Offer = { id: 'o-1', title: 'PFE', city: 'Rabat', workMode: 'remote', stipendMad: 3000 };
export const o2: Offer = { id: 'o-2', title: 'PFE', city: 'Fès', workMode: 'hybrid', stipendMad: 0, skills: ['React'] };

// @ts-expect-error  'distanciel' n'est pas un WorkMode
export const o3: Offer = { id: 'o-3', title: 'PFE', city: 'Fès', workMode: 'distanciel', stipendMad: 0 };
// @ts-expect-error  stipendMad doit être un nombre
export const o4: Offer = { id: 'o-4', title: 'PFE', city: 'Fès', workMode: 'remote', stipendMad: '3000' };
// @ts-expect-error  city est obligatoire
export const o5: Offer = { id: 'o-5', title: 'PFE', workMode: 'remote', stipendMad: 0 };

// Une fonction qui traite TOUS les cas de l'union : si on ajoutait un mode, TypeScript le signalerait.
export function libelle(mode: WorkMode): string {
  switch (mode) {
    case 'onsite':
      return 'Sur site';
    case 'hybrid':
      return 'Hybride';
    case 'remote':
      return 'Télétravail';
  }
}

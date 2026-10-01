// Exercice TS.5 : typer une réponse d'API
//
// TypeScript ne vérifie rien pendant l'exécution : ce que renvoie l'API est de type unknown
// tant qu'on ne l'a pas testé. Écrivez :
//
//   1. estOffre(x: unknown): x is Offer
//      Un « garde de type » : renvoie true seulement si x est un objet non nul avec
//      id (texte), title (texte), city (texte) et stipendMad (nombre).
//   2. chargerOffre(id, chercher): Promise<Offer>
//      Appelle chercher(`/api/offers/${id}`). Si la réponse n'est pas ok, lève
//      Error(`Offre introuvable (${status})`). Sinon lit le JSON, et lève
//      Error('Réponse invalide') si ce n'est pas une Offer.
//
// `chercher` joue le rôle de fetch : on le reçoit en paramètre pour pouvoir le simuler dans les tests.
//
// Vérifier : npm run ts 5   (compile, puis lance les tests de 05-promesse.test.ts)

export type Offer = { id: string; title: string; city: string; stipendMad: number };

export type Reponse = { ok: boolean; status: number; json: () => Promise<unknown> };
export type Chercher = (url: string) => Promise<Reponse>;

export function estOffre(x) {
  // À écrire
}

export async function chargerOffre(id, chercher) {
  // À écrire
}

// ---- Ce que TypeScript doit accepter, grâce au garde de type ----
export function exemple(x: unknown): string | undefined {
  if (estOffre(x)) {
    return x.title; // n'est permis que si estOffre est un garde : x devient une Offer
  }
  return undefined;
}

export async function exemple2(chercher: Chercher): Promise<number> {
  const offre: Offer = await chargerOffre('o-1', chercher);
  return offre.stipendMad;
}

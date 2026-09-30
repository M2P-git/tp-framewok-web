# TP S3 : brancher BabStage sur l'API, et le formulaire de candidature

**Objectif** : la page de S2 devient une application branchée sur l'API simulée : recherche
côté serveur, pagination, gestion des erreurs, fiche d'une offre, et formulaire de
candidature validé par les mêmes règles que le serveur.

## Avant de commencer

- Votre projet `babstage-web` à la fin du TP S2.
- L'API simulée, dans un **second terminal**, à la racine de ce dépôt :

  ```bash
  node api-simulee/serveur.mjs      # puis ouvrir http://localhost:3001
  # sans Node.js : docker compose up api
  ```

  Ses réglages, pour les tests : `LATENCE=1500` (réponses lentes), `PANNE=0.5` (une requête sur deux échoue),
  `ALEATOIRE=1` (réponses dans le désordre). Sous PowerShell : `$env:PANNE=0.5; node api-simulee/serveur.mjs`.

## Les fichiers fournis

Copiez le contenu de [`fichiers-fournis/`](fichiers-fournis/) dans votre projet :

| Fichier | Rôle |
| --- | --- |
| `.env.example` | à copier en `.env` : l'adresse de l'API (`VITE_API_URL`) |
| `src/api/client.ts` | toutes les requêtes vers l'API (`fetchOffers`, `fetchOffer`, `fetchApplications`, `createApplication`) |
| `src/styles.css` | remplace celui de S2 : ajoute le style des titres cliquables |

`client.ts` importe des types qui n'existent pas encore dans votre `types.ts` : c'est le
premier travail du checkpoint 1.

## Le travail à faire

1. **Checkpoint 1 : l'API.** Lancez l'API simulée et ouvrez `http://localhost:3001/api/offers` : lisez la forme de la réponse. Copiez `client.ts`, puis **complétez `types.ts`** avec les types `Company`, `OfferWithCompany`, `OffersPage`, `Application` et `NewApplication`, d'après les réponses de l'API. `npm run build` ne doit plus signaler d'erreur de type.
2. **Checkpoint 2 : TanStack Query.** Installez `@tanstack/react-query`, ajoutez le fournisseur dans `main.tsx`, écrivez le hook `useOffers`, et remplacez dans `App` les données en dur par `useOffers({ q: search, city, page })`. Supprimez `src/data/offers.json` : les données viennent maintenant du serveur. Ajoutez la pagination (boutons « Précédente » et « Suivante »).
3. **Checkpoint 3 : l'anti-rebond et les erreurs.** Écrivez le hook `useDebounce`, pour ne lancer la recherche qu'à la fin de la frappe. Relancez l'API avec `PANNE=0.5` : un message clair et un bouton « Réessayer » doivent s'afficher.
4. **Checkpoint 4 : la fiche et le formulaire.** Rendez le titre des cartes cliquable (une prop `onOpen`), affichez la fiche de l'offre (`OfferDetail`), puis le formulaire de candidature (`ApplicationForm`, avec React Hook Form et un schéma Zod). Envoyez une candidature trop courte (le formulaire doit la refuser), puis une valide (l'API répond 201).

## Pour aller plus loin

- **Exercice 3.2 : un bouton « Réessayer ».** Relancez l'API avec `PANNE=0.5`. Ajoutez un bouton « Réessayer », affiché avec le message d'erreur, qui relance la requête.
- **Exercice 3.3 : la fiche d'une offre.** Écrivez un hook `useOffer(id)` qui charge une offre et son entreprise avec `GET /api/offers/:id`, puis un composant `OfferDetail` qui affiche « Chargement de l'offre... », un message d'erreur, ou le titre, l'entreprise et la description.
- **Exercice 3.4 : une date dans le futur.** Une disponibilité dans le passé n'a pas de sens. Ajoutez une règle au schéma : la date doit être aujourd'hui ou plus tard, avec un message clair. Indice : `.refine(condition, message)` ajoute une règle libre à un schéma Zod.

## À rendre

Votre dépôt `babstage-web`, avec un commit par checkpoint.

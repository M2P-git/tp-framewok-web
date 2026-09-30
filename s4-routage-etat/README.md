# TP S4 : routes, état partagé et qualité (jalon J1)

**Objectif** : donner à chaque écran de BabStage sa propre adresse, partager les favoris dans
toute l'application, protéger une page, et mettre en place les tests et l'intégration
continue. Le temps d'équipe de la séance est consacré au **jalon J1** du projet.

## Avant de commencer

- Votre projet `babstage-web` à la fin du TP S3.
- L'API simulée, dans un second terminal : `node api-simulee/serveur.mjs` (ou `docker compose up api`).

Aucun fichier n'est fourni : tout s'écrit à partir du cours (chapitre « Naviguer et partager l'état »).

## Le travail à faire

1. **Checkpoint 1 : les routes.** Installez `react-router`. Créez `router.tsx`, un composant `Layout` et les pages : `OffersPage` reprend le contenu de l'ancien `App`, puis la fiche d'une offre, les favoris, les candidatures, la connexion et une page 404. Remplacez `App` par `<RouterProvider>` dans `main.tsx`. Le titre des cartes devient un `<Link>`.
   Vérifiez : l'adresse d'une fiche (`/offres/o-0004`) s'ouvre dans un nouvel onglet, et « Précédent » ramène à la liste.
2. **Checkpoint 2 : le store.** Installez `@reduxjs/toolkit` et `react-redux`. Créez la tranche des favoris et le store, et ajoutez `<Provider>`. Les favoris doivent être partagés par l'en-tête, la liste et la page Favoris, et **survivre au rechargement** de la page.
3. **Checkpoint 3 : contexte et route protégée.** Ajoutez un contexte pour le thème (clair ou sombre), une connexion simulée, et un composant `ProtectedRoute` qui renvoie vers la page de connexion si personne n'est connecté (par exemple pour la page des candidatures).
4. **Checkpoint 4 : la qualité.** Installez Vitest et Testing Library, et écrivez les deux tests présentés dans le cours : celui de la carte d'offre (`OfferCard`) et celui de la tranche des favoris. Ajoutez un workflow d'intégration continue GitHub Actions qui vérifie les types, lance les tests et construit le projet. Poussez sur GitHub : tout doit être vert.

## Pour aller plus loin

- **Exercice 4.1 : la page d'une entreprise.** Dessinez l'arbre des routes de BabStage sur papier, de mémoire. Puis ajoutez une route `/entreprises/:companyId` qui affiche le nom, le secteur, la zone et l'effectif de l'entreprise (API : `GET /api/companies/:id`). Dans la fiche d'une offre, le nom de l'entreprise devient un lien vers cette page.
- **Exercice 4.2 : un comparateur d'offres.** Créez une tranche `compare` qui contient au plus **trois** identifiants d'offres, avec une action `toggleCompare(id)` : elle retire l'offre si elle y est déjà, l'ajoute sinon, mais seulement s'il reste de la place. Ajoutez-la au store.

## Le jalon J1 (en équipe)

Voir [`../projet-equipe`](../projet-equipe/README.md). La liste de contrôle :

- [ ] le backlog de l'extension est écrit et trié dans GitHub Projects ;
- [ ] les maquettes des écrans de l'extension sont faites (papier ou Figma) ;
- [ ] les composants React de l'extension s'affichent, sur des données simulées ;
- [ ] chaque membre a au moins une pull request relue et fusionnée ;
- [ ] l'intégration continue est verte sur `main`.

## À rendre

Votre dépôt `babstage-web` (un commit par checkpoint, intégration continue verte), et le dépôt
de l'équipe au jalon J1.

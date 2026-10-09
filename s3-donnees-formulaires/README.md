# TP S3 : brancher Mawid sur l'API, et le parcours de réservation

**Objectif** : l'application de S2 devient une vraie application branchée sur un serveur :
l'annuaire des établissements (recherche côté serveur, pagination, erreurs), la page d'un
établissement chargée depuis l'API, puis **le parcours de réservation** : choisir un jour, voir les
créneaux libres, remplir ses coordonnées, réserver. Avec tous les cas qu'un client réel rencontre :
le chargement, l'erreur, la liste vide, le créneau pris entre-temps.

## Avant de commencer

- Votre projet `mawid-web` à la fin du TP S2.
- L'API simulée, dans un **second terminal**, à la racine de ce dépôt :

  ```bash
  node api-simulee/serveur.mjs      # puis ouvrir http://localhost:3001
  # sans Node.js : docker compose up api
  ```

  La page `http://localhost:3001` liste toutes les adresses de l'API, avec des liens à essayer.
  Ses réglages, pour les tests : `LATENCE=1500` (réponses lentes), `PANNE=0.5` (une requête sur
  deux échoue), `ALEATOIRE=1` (réponses dans le désordre). Sous PowerShell :
  `$env:PANNE=0.5; node api-simulee/serveur.mjs`.

## Les fichiers fournis

Copiez le contenu de [`fichiers-fournis/`](fichiers-fournis/) dans votre projet :

| Fichier | Rôle |
| --- | --- |
| `.env.example` | à copier en `.env` : l'adresse de l'API (`VITE_API_URL`) |
| `src/api/client.ts` | toutes les requêtes vers l'API (`fetchBusinesses`, `fetchBusiness`, `fetchAvailability`, `createBooking`...) |

`client.ts` importe des types qui n'existent pas encore dans votre `types.ts` : c'est le premier
travail du checkpoint 1.

## Le travail à faire

1. **Checkpoint 1 : le contrat.** Lancez l'API et ouvrez dans le navigateur
   `/api/businesses`, `/api/businesses/salon-yasmine-rabat` et un lien `availability` de la page
   d'aide. Lisez la forme des réponses. Constatez que `/api/businesses/salon-yasmine-rabat` a
   **exactement** la forme de vos données de S2. Copiez `client.ts`, puis **complétez `types.ts`**
   avec `BusinessSummary`, `BusinessesPage`, `Category`, `City`, `Slot`, `Availability`,
   `BookingStatus`, `Booking`, `NewBooking` et `AuthSession`, d'après les réponses.
   `npx tsc --noEmit` ne doit plus rien signaler. (Une IA peut vous proposer ces types à partir
   d'un exemple de réponse : vérifiez chaque champ facultatif et chaque `null`.)

2. **Checkpoint 2 : TanStack Query et l'annuaire.** Installez `@tanstack/react-query`, ajoutez le
   fournisseur dans `main.tsx`, et écrivez `BusinessesPage` (la page d'accueil) avec le hook
   `useBusinesses({ q, city, category, page })` : des cartes d'établissement (nom, ville, note,
   « à partir de ... »), un champ de recherche, les menus ville et catégorie (`fetchCities`,
   `fetchCategories`), et la pagination (« Précédente », « Suivante »).

3. **Checkpoint 3 : les trois états, l'anti-rebond.** Chaque liste affiche un état de
   **chargement**, un état **vide** (« Aucun établissement ne correspond ») et un état d'**erreur**
   avec un bouton « Réessayer ». Relancez l'API avec `PANNE=0.5` pour le vérifier. Écrivez le hook
   `useDebounce`, pour ne lancer la recherche qu'à la fin de la frappe. Puis relancez avec
   `ALEATOIRE=1` et tapez vite : les résultats affichés correspondent-ils toujours au texte tapé ?
   (TanStack Query règle ce problème grâce à la clé de requête : expliquez comment.)

4. **Checkpoint 4 : la page d'un établissement, depuis l'API.** Remplacez `salons.json` par
   `useBusiness(slug)` : la page de S2 fonctionne **sans changer vos composants**. Supprimez
   `src/data/` : les données viennent maintenant du serveur.

5. **Checkpoint 5 : les créneaux.** Sous le résumé de la sélection, ajoutez le choix du jour (les
   7 prochains jours, en boutons) et le composant `SlotPicker`, avec
   `useAvailability(businessId, date, selection)`. Affichez la raison quand il n'y a pas de créneau
   (`availability.reason` : « Fermé ce jour-là », « Complet ce jour-là »). Vérifiez que la durée
   des créneaux suit la sélection : avec deux prestations, il y a moins de créneaux.

6. **Checkpoint 6 : le formulaire de réservation.** Écrivez `BookingForm` avec React Hook Form et
   un schéma Zod : prénom et nom (2 à 50 caractères), téléphone marocain (`06 12 34 56 78`,
   `+212 6 12 34 56 78`...), courriel facultatif, note (300 caractères au plus), et une case
   d'accord **obligatoire** pour l'enregistrement des données (loi 09-08). Envoyez avec
   `useMutation` et `createBooking`. Gérez les trois réponses :
   - **201** : affichez la confirmation (identifiant, jour, heure, statut « en attente » ou « confirmé ») ;
   - **422** : affichez les erreurs du serveur sous les champs concernés (`error.fieldErrors`) ;
   - **409** : « Ce créneau vient d'être pris » ; rechargez les créneaux (`invalidateQueries`) et
     laissez le client en choisir un autre, **sans perdre** ce qu'il a tapé.

   Pour provoquer un 409, il faut un créneau où **un seul** employé est libre : sinon, la deuxième
   réservation réussit (le serveur attribue simplement un autre employé, c'est le comportement
   voulu). Ouvrez dans le navigateur l'adresse `availability` du jour choisi, repérez une heure
   dont la liste `staffIds` ne contient qu'un identifiant, choisissez-la dans deux onglets, puis
   validez dans l'un, puis dans l'autre. Vérifiez trois choses : le message est clair, ce qui a
   été tapé est toujours là, et l'heure prise a disparu de la liste. (Indice : si votre
   formulaire disparaît au moment du 409, c'est qu'il dépend de l'heure choisie ; il doit rester
   affiché.)

## Pour aller plus loin

- **Exercice 3.2 : la pagination dans l'adresse.** Que se passe-t-il quand on recharge la page 3 ?
  (Réponse en S4 : l'état qui doit survivre au rechargement va dans l'URL.)
- **Exercice 3.3 : choisir son employé.** Ajoutez un menu « Avec qui ? » (« Sans préférence » par
  défaut, puis les employés qui savent faire **toutes** les prestations choisies) et passez
  `staffId` à `fetchAvailability`.
- **Exercice 3.4 : tester la logique.** Installez Vitest (`npm install -D vitest`) et copiez les
  tests de la série P à côté de vos fichiers `src/lib/*.ts`. `npx vitest` : tout doit être vert.

## À rendre

Votre dépôt `mawid-web`, avec un commit par checkpoint, et votre réponse mise à jour à la
deuxième question de l'annonce (« comment empêcher deux clients de réserver le même créneau ? »).

## Ce qu'il faut retenir

- Le **contrat d'API** (les adresses et la forme des réponses) est ce qui permet à l'interface et
  au serveur d'avancer séparément. Les types TypeScript en sont la traduction.
- Les données du serveur ne sont pas de l'état comme les autres : elles sont **en cache**, elles
  peuvent être périmées, en cours de chargement ou en erreur. Un outil dédié (TanStack Query)
  gère tout cela mieux que `useEffect` écrit à la main.
- Toute liste a **trois états** en plus de « pleine » : chargement, vide, erreur.
- On valide **des deux côtés** : dans le formulaire pour aider l'utilisateur, sur le serveur pour
  se protéger. Le serveur a toujours le dernier mot (409, 422).

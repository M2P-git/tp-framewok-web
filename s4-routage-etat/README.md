# TP S4 : les routes, l'espace pro, les tests, et la livraison du jalon M1

**Objectif** : donner à chaque écran de Mawid sa propre adresse, construire l'espace du gérant
(connexion simulée, agenda du jour, changement de statut), partager le brouillon de réservation
dans toute l'application, **prouver** que le parcours principal fonctionne avec des tests et
l'intégration continue, puis **livrer** le premier jalon comme un professionnel : une version en
ligne, une démonstration, un procès-verbal de recette.

## Avant de commencer

- Votre projet `mawid-web` à la fin du TP S3.
- L'API simulée, dans un second terminal : `node api-simulee/serveur.mjs` (ou `docker compose up api`).

Aucun fichier n'est fourni : tout s'écrit à partir du cours.

## Les adresses de Mawid

| Adresse | Écran | Accès |
| --- | --- | --- |
| `/` | l'annuaire des établissements | tous |
| `/:slug` | la page d'un établissement (par exemple `/salon-yasmine-rabat`) | tous |
| `/:slug/reserver` | le choix du créneau et le formulaire | tous |
| `/reservation/:id` | la confirmation d'un rendez-vous | tous |
| `/pro/connexion` | la connexion du gérant | tous |
| `/pro/agenda` | l'agenda du jour | gérant connecté |
| `*` | la page 404 | tous |

## Le travail à faire

1. **Checkpoint 1 : les routes.** Installez `react-router`. Créez `router.tsx`, un composant
   `Layout` (barre de navigation et `<Outlet />`) et les pages du tableau. Les filtres de
   l'annuaire (`q`, `city`, `category`, `page`) passent **dans l'adresse** (`useSearchParams`) :
   rechargez la page 3 d'une recherche, elle reste la page 3, et on peut l'envoyer par WhatsApp.
   Vérifiez : `/salon-yasmine-rabat` s'ouvre dans un nouvel onglet ; « Précédent » ramène à la
   liste ; `/nimporte-quoi` affiche la page 404 (et un slug inconnu aussi : l'API répond 404).

2. **Checkpoint 2 : le brouillon de réservation, partagé.** Installez `@reduxjs/toolkit` et
   `react-redux`. Créez la tranche `bookingDraft` : `businessId`, `serviceIds`, `staffId`,
   `date`, `time`, avec les actions `toggleService`, `chooseSlot`, `reset`. La page de
   l'établissement et la page `/:slug/reserver` lisent et modifient le **même** brouillon. Il doit
   survivre au rechargement (`sessionStorage`) et être vidé après une réservation réussie.
   Réutilisez votre fonction `basculer` dans le reducer : la logique métier reste dans `src/lib/`.

3. **Checkpoint 3 : l'espace pro.** Un contexte `AuthContext` garde la session (`login` de
   `client.ts` ; comptes de démo : `salon-yasmine-rabat@pro.mawid.test` / `demo1234`). Le composant
   `ProtectedRoute` renvoie vers `/pro/connexion` si personne n'est connecté. La page
   `/pro/agenda` affiche les rendez-vous du jour de **son** établissement
   (`fetchBusinessBookings`), triés par heure, avec la couleur de l'employé, le client, les
   prestations et le statut, et un sélecteur de jour. Les boutons d'action dépendent du statut
   (machine à états de P.5 : `peutPasser`) : « Confirmer », « Annuler », « Honoré », « Absent ».
   Ils appellent `updateBookingStatus` avec `useMutation`, puis rechargent l'agenda
   (`invalidateQueries`).

4. **Checkpoint 4 : la preuve.** Installez Vitest et Testing Library. Écrivez au moins :
   - les tests de `src/lib/` (ceux de la série P, adaptés) ;
   - un test du composant `ServiceCard` : le nom, la durée et le prix s'affichent ; « Offert »
     pour un prix de 0 ; un clic sur « Ajouter » appelle `onToggle` avec le bon identifiant ;
   - un test du reducer `bookingDraft` : `toggleService` ajoute puis retire ; `reset` vide tout ;
   - un test de `SelectionSummary` : rien n'est affiché quand la sélection est vide.

   Ajoutez un workflow GitHub Actions qui vérifie les types, lance les tests et construit le
   projet à chaque push. Poussez : tout doit être vert, et le badge s'affiche dans le README.

5. **Checkpoint 5 : la livraison du jalon M1.**
   - Mettez l'application en ligne (Netlify, Vercel ou GitHub Pages) ; l'API simulée peut tourner
     sur Render (service web gratuit, `node api-simulee/serveur.mjs`) : réglez `VITE_API_URL`.
     Si l'API n'est pas en ligne, la démo se fait en local, et la vidéo montre le parcours.
   - Étiquetez la version : `git tag v0.1.0 && git push --tags`.
   - Complétez le README en étude de cas (`../modeles/readme-portfolio.md`) : capture, lien,
     choix techniques, ce qui était difficile.
   - Enregistrez une vidéo de **2 minutes** : un client réserve sur téléphone (outils de
     développement, mode mobile), le gérant confirme dans son agenda.
   - Faites la recette avec la cliente (l'enseignant) : `../modeles/pv-recette.md`, une ligne par
     critère d'acceptation des stories du MVP.

## Pour aller plus loin

- **Exercice 4.1 : le tableau de bord.** Une page `/pro/tableau-de-bord` : chiffre d'affaires des
  30 derniers jours, nombre de rendez-vous par statut, taux d'absence, prestation la plus
  demandée. Les chiffres sont **calculés** à partir de `fetchBusinessBookings` sur une période
  (votre fonction `statistiques` de P.5).
- **Exercice 4.2 : le thème sombre.** Un contexte `ThemeContext` (clair ou sombre) qui pose
  `data-theme` sur `<html>`. Grâce aux jetons de design, aucune autre ligne de CSS à écrire.
- **Exercice 4.3 : mes rendez-vous.** Pour un client « connecté » (`moussa.sow1@mail.test` /
  `demo1234`), une page qui liste ses rendez-vous (`fetchCustomerBookings`) et permet d'annuler
  ceux qui peuvent l'être. Que répond l'API si on annule moins de 24 h avant ?

## Le jalon M1 en équipe

Voir [`../projet-equipe`](../projet-equipe/README.md). La liste de contrôle :

- [ ] la fiche de cadrage et le backlog de l'extension sont validés par la cliente ;
- [ ] les maquettes des écrans de l'extension sont faites et validées ;
- [ ] les composants de l'extension s'affichent, sur l'API simulée, avec leurs trois états ;
- [ ] chaque membre a au moins deux pull requests relues et fusionnées ;
- [ ] l'intégration continue est verte sur `main`, avec au moins un test par membre ;
- [ ] le PV de recette du jalon M1 est rempli ; le journal IA de chaque membre est à jour.

## À rendre

Votre dépôt `mawid-web` (un commit par checkpoint, intégration continue verte, tag `v0.1.0`,
README d'étude de cas, lien de la vidéo), et le dépôt de l'équipe au jalon M1.

## Ce qu'il faut retenir

- L'**adresse** fait partie de l'état : ce qui doit survivre à un rechargement ou se partager
  (une recherche, une page, un établissement) va dans l'URL.
- Chaque état a sa place : **local** (un champ de formulaire), **remonté** (une sélection partagée
  par deux composants), **global** (la session, le brouillon de réservation), **serveur** (les
  données de l'API, dans le cache de TanStack Query), **URL** (les filtres).
- Les règles du métier (la machine à états) vivent dans des fonctions pures, testées une fois,
  réutilisées par l'interface... et revérifiées par le serveur.
- Un jalon livré = une version **en ligne**, **étiquetée**, **testée**, **documentée** et
  **acceptée** par le client. « Ça marche sur ma machine » n'est pas une livraison.

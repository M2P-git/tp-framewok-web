# TP S2 : la page d'un salon, en composants, et un gabarit qui change de marque

**Objectif** : construire, dans votre propre projet `mawid-web`, la page publique d'un
établissement : son en-tête, ses prestations regroupées, une recherche, et la sélection du client
avec son résumé (« 2 prestations · 230 DH · 1 h 15 »). Puis rendre ce gabarit **modifiable** :
en changeant **une seule donnée**, la même page prend les couleurs, la police et le logo d'un autre
établissement. C'est ce qui permet à un freelance de vendre le même produit à cent clients.

À la fin, le bug de la sélection du prototype en JavaScript pur (TP S1.1) a disparu.

## Avant de commencer

Il vous faut le projet React créé avant la séance (voir [`../00-installation`](../00-installation/README.md), checkpoint 4) :

```bash
npm create vite@latest mawid-web -- --template react-ts
cd mawid-web
npm install
npm run dev        # puis ouvrir http://localhost:5173
```

Et vos fonctions de la série P (TP S1 bis) : `01-prix.js`, `02-selection.js`, `03-catalogue.js`.

## Les fichiers fournis

Copiez le contenu de [`fichiers-fournis/src/`](fichiers-fournis/src/) dans le dossier `src/` de votre projet :

| Fichier | Rôle |
| --- | --- |
| `src/data/salons.json` | quatre établissements (un salon, un barbier, un hammam, un studio de yoga), **exactement** comme l'API les renverra en S3 |
| `src/types.ts` | les types `Business`, `Service`, `StaffMember`, `Theme`... |
| `src/styles.css` | les styles, construits sur des **variables** (jetons de design) ; importez-les dans `main.tsx` : `import './styles.css';` |

Tout le reste, c'est à vous de l'écrire.

## Le travail à faire

1. **Vos fonctions métier.** Créez `src/lib/` et copiez-y vos fichiers de la série P en les
   renommant en `.ts` : `prix.ts`, `selection.ts`, `catalogue.ts`. Ajoutez les types des
   paramètres (`prestations: Service[]`, `selection: string[]`...) jusqu'à ce que
   `npx tsc --noEmit` ne signale plus rien. C'est votre exercice de TypeScript du jour.

2. **Les données.** Dans `App.tsx` :

   ```typescript
   import salonsData from './data/salons.json';
   import type { Business } from './types';

   const salons = salonsData as Business[];
   const salon = salons[0]; // Salon Yasmine
   ```

3. **Checkpoint 1 : l'en-tête et une carte.** Écrivez `SalonHeader` (logo avec les initiales,
   nom, quartier et ville, accroche, note moyenne) et `ServiceCard` (nom, durée, prix avec
   `formaterPrix`, bouton « Ajouter »). Affichez l'en-tête et la première prestation.

4. **Checkpoint 2 : la liste regroupée.** Écrivez `ServiceList`, qui affiche les prestations
   **par groupe** (Coupe, Couleur, Soins) avec `grouperParGroupe` (pensez à la `key` de chaque
   élément : laquelle ?).

5. **Checkpoint 3 : la sélection.** Ajoutez l'état `selection` (une liste d'identifiants) dans
   `App`, la fonction `basculer`, et `SelectionSummary` en bas de l'écran (« 2 prestations ·
   230 DH · 1 h 15 », avec `resumeSelection`). Le résumé est **calculé**, jamais stocké.
   N'affichez pas le résumé si la sélection est vide.

6. **Checkpoint 4 : la recherche.** Écrivez `ServiceFilters` (un champ de texte et un menu des
   groupes). Remontez `q` et `groupe` dans `App`, et calculez les prestations visibles avec
   `filtrerPrestations`, sans les stocker.

7. **Checkpoint 5 : le gabarit en marque blanche.** Ajoutez un menu (provisoire) qui choisit le
   salon parmi les quatre. Écrivez `ThemeProvider` (ou une simple fonction `themeVersStyle`) qui
   pose les variables `--marque-primaire`, `--marque-douce`, `--marque-police` et
   `--marque-arrondi` à partir de `salon.theme` sur l'élément racine :

   ```tsx
   <div className="app" style={{ '--marque-primaire': salon.theme.primary } as React.CSSProperties}>
   ```

   **Vérification** : en changeant de salon, les couleurs, la police, les arrondis et le logo
   changent, **sans aucune autre modification**. Cherchez dans votre code : `grep -rn "#[0-9a-f]\{6\}" src/components`
   ne doit rien trouver. Une couleur en dur dans un composant est un bug de gabarit.

8. **Checkpoint 6 : le flux GitHub**, en fin de séance :
   - publiez `mawid-web` dans un dépôt GitHub personnel, avec un `README.md` d'au moins trois
     lignes (partez de `../modeles/readme-portfolio.md`) ;
   - copiez `../modeles/AGENTS.md` à la racine : ce sont les règles du projet pour les assistants IA ;
   - en équipe, créez le dépôt de l'extension (voir `../projet-equipe`) ; chaque membre ouvre une
     première pull request, relue et fusionnée par un coéquipier.

## La vérification finale

Refaites le test qui échouait en S1 : ajoutez « Coupe femme » et « Coloration racines », filtrez
sur « Coupe », puis revenez à tous les groupes. Les deux prestations sont toujours cochées, et le
résumé dit juste. Puis passez au Studio Yoga Ifrane : la « Séance découverte » affiche « Offert »,
et pas « 0 » (le piège du `0` en JSX : `{prix && <span>...}` affiche `0`).

## Pour aller plus loin

- **Exercice 2.5 : trier.** Ajoutez un menu « Trier par » (prix, durée, nom) avec `trierPrestations`.
- **Exercice 2.6 : un cinquième client.** Ajoutez à `salons.json` un établissement inventé, avec
  sa propre couleur et sa propre police. Combien de fichiers avez-vous modifiés ? (Réponse attendue : un.)
- **Exercice 2.7 : l'accessibilité.** Naviguez sur la page **au clavier seulement** (Tab, Entrée,
  Espace). Pouvez-vous tout faire ? Le bouton « Ajouter » dit-il à un lecteur d'écran s'il est
  coché (`aria-pressed`) ?

## À rendre

L'adresse de votre dépôt GitHub `mawid-web`, avec les checkpoints 1 à 5 (un commit par
checkpoint, avec un message clair), et le lien de la pull request du checkpoint 6.

## Ce qu'il faut retenir

- Un composant est une **fonction** qui reçoit des données (les props) et renvoie de l'interface.
- L'**état** est la mémoire de l'interface ; tout ce qui se calcule à partir de l'état est **dérivé**,
  et ne se stocke pas.
- Les données **descendent** (props), les événements **remontent** (fonctions passées en props).
- Un gabarit modifiable sépare trois choses : la **structure** (les composants), le **style**
  (les jetons de design, en variables CSS) et le **contenu** (les données). On change un client
  en changeant des données, jamais du code.

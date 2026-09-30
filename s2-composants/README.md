# TP S2 : la page des offres en composants React

**Objectif** : construire, dans votre propre projet `babstage-web`, la page des offres de
BabStage en composants React : des cartes, une liste, des favoris et une recherche. À la fin,
le bug des favoris du prototype en JavaScript pur (TP S1.1) a disparu.

## Avant de commencer

Il vous faut le projet React créé avant la séance (voir [`../00-installation`](../00-installation/README.md), checkpoint 4) :

```bash
npm create vite@latest babstage-web -- --template react-ts
cd babstage-web
npm install
npm run dev        # puis ouvrir http://localhost:5173
```

## Les fichiers fournis

Copiez le contenu de [`fichiers-fournis/src/`](fichiers-fournis/src/) dans le dossier `src/` de votre projet :

| Fichier | Rôle |
| --- | --- |
| `src/data/offers.json` | les 300 offres de BabStage, dont 279 publiées |
| `src/types.ts` | le type `Offer` |
| `src/styles.css` | les styles de la page ; importez-les dans `main.tsx` : `import './styles.css';` |

Tout le reste, c'est à vous de l'écrire.

## Le travail à faire

1. **Les données.** Dans `App.tsx`, importez les offres :

   ```typescript
   import offersData from './data/offers.json';
   import type { Offer } from './types';

   const offers = offersData as Offer[];
   ```

2. **Checkpoint 1 : la carte.** Écrivez le composant `OfferCard` (titre, entreprise, ville, gratification, bouton favori), et affichez la première offre :

   ```tsx
   <OfferCard offer={offers[0]} isFavorite={false} onToggleFavorite={() => {}} />
   ```

3. **Checkpoint 2 : la liste.** Écrivez `OfferList`, qui affiche les **279 offres publiées** (pensez à la `key` de chaque élément).
4. **Checkpoint 3 : les favoris.** Ajoutez l'état `favorites` dans `App`, la fonction `toggleFavorite`, et le compteur de favoris dans l'en-tête.
5. **Checkpoint 4 : la recherche.** Écrivez `SearchBar` (un champ de texte et un menu des villes). Remontez `search` et `city` dans `App`, et calculez `visibleOffers` à partir de l'état (sans le stocker).
6. **Checkpoint 5 : le flux GitHub**, en fin de séance :
   - publiez votre projet `babstage-web` dans un dépôt GitHub personnel ;
   - en équipe, créez le dépôt de l'extension et son tableau **GitHub Projects** (« À faire », « En cours », « En relecture », « Terminé ») ;
   - chaque membre ouvre une première pull request (par exemple, son nom dans le `README.md`), relue et fusionnée par un coéquipier :

   ```bash
   git switch -c ajoute-mon-nom
   # ... ajouter son nom dans README.md ...
   git add README.md
   git commit -m "Ajoute Prénom Nom à l'équipe"
   git push -u origin ajoute-mon-nom    # puis ouvrir la pull request sur GitHub
   ```

## La vérification finale

Refaites le test qui échouait en S1 : marquez deux favoris, filtrez sur Rabat, puis revenez à
toutes les villes. Les étoiles doivent toujours être là, et le compteur doit dire juste.

## Pour aller plus loin

**Exercice 2.5 : filtrer par mode de travail.** Ajoutez à `SearchBar` un second menu « Mode »
(Tous, Sur site, Hybride, Télétravail), et filtrez les offres en conséquence dans `App`.

## À rendre

L'adresse de votre dépôt GitHub `babstage-web`, avec les checkpoints 1 à 4 (un commit par
checkpoint, avec un message clair), et le lien de la pull request du checkpoint 5.

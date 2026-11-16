# L1 : la page du salon (cours live)

On construit, dans **votre** projet `mawid-web` (créé en S2), la page d'un salon Mawid : l'en-tête,
les cartes des prestations, la sélection et son résumé. À chaque étape : un rappel de JavaScript de
cinq minutes, la notion React, le code tapé en direct, puis le même code dans votre projet et un
commit. Les diapos : [`L1_page_salon.pdf`](L1_page_salon.pdf).

![La page du Salon Yasmine à la fin de la séance](apercu.png)

On suppose que `mawid-web` et `tp-framewok-web` sont **côte à côte**, dans le même dossier :

```text
cours-frameworks/
├── mawid-web/          votre projet (S2)
└── tp-framewok-web/    ce dépôt
```

Toutes les commandes se tapent dans le terminal de VS Code (*Terminal*, *Nouveau terminal*),
**dans le dossier `mawid-web`** sauf indication contraire.

## Les commandes, dans l'ordre de la séance

### Au début (0 h 00) : préparer le projet

1. **Mettre votre travail de S2 à l'abri** (Git).

   ```bash
   git init                                  # une seule fois : le projet devient un dépôt Git
   git add .
   git commit -m "S2 : mon projet avant L1"
   ```

   Git demande votre nom ? Une fois sur votre ordinateur :
   `git config --global user.name "Prénom Nom"` et `git config --global user.email "vous@exemple.ma"`.

2. **Récupérer les fichiers de L1** depuis ce dépôt, puis les copier dans votre `src/`.

   Windows (PowerShell) :

   ```powershell
   cd ..\tp-framewok-web ; git pull ; cd ..\mawid-web
   Copy-Item -Recurse -Force ..\tp-framewok-web\live\L1\fournis\src\* .\src\
   ```

   macOS, Linux :

   ```bash
   cd ../tp-framewok-web && git pull && cd ../mawid-web
   cp -R ../tp-framewok-web/live/L1/fournis/src/* src/
   ```

   Pas de dossier `tp-framewok-web` ? Dans le dossier qui contient `mawid-web` :
   `git clone https://github.com/M2P-git/tp-framewok-web.git`.

3. **Brancher les styles** : dans `src/main.jsx`, remplacer `import './index.css'` par
   `import './styles.css'`.

4. **Lancer, puis enregistrer.**

   ```bash
   npm run dev                               # http://localhost:5173 : « La page de Salon Yasmine arrive ici »
   git add .
   git commit -m "L1 : les fichiers fournis"
   ```

Pas de projet `mawid-web` ? Créez-le comme en S2 : `npm create vite@latest mawid-web -- --template react`,
`cd mawid-web`, `npm install`, puis reprenez au point 1.

### À la fin de chaque étape : un commit

| Étape | Ce que vous avez créé ou modifié | Commande |
| --- | --- | --- |
| 1 · l'en-tête | `components/EnteteSalon.jsx`, `App.jsx` | `git add .` puis `git commit -m "L1 étape 1 : l'en-tête"` |
| 2 · les cartes | `components/CarteService.jsx`, `components/ListeServices.jsx`, `App.jsx` | `git add .` puis `git commit -m "L1 étape 2 : les cartes"` |
| 3 · la sélection | `App.jsx`, `ListeServices.jsx`, `CarteService.jsx` | `git add .` puis `git commit -m "L1 étape 3 : choisir une prestation"` |
| 4 · le résumé | `components/ResumeSelection.jsx`, `App.jsx` | `git add .` puis `git commit -m "L1 étape 4 : le résumé"` |
| exercice B | `App.jsx` | `git commit -am "L1 : le filtre par catégorie"` |

`git log --oneline` affiche vos commits, du plus récent au plus ancien.

### Perdu pendant une étape ?

Copiez la correction de l'étape dans votre `src/` (remplacer `etape-2` par l'étape voulue) :

```powershell
Copy-Item -Recurse -Force ..\tp-framewok-web\live\L1\etapes\etape-2\src\* .\src\
```

```bash
cp -R ../tp-framewok-web/live/L1/etapes/etape-2/src/* src/
```

Votre propre version reste dans vos commits : rien n'est perdu.

### À la fin de la séance (2 h 55) : publier sur GitHub

La première fois : sur github.com, *New repository*, nom `mawid-web`, **sans** README. Puis :

```bash
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/mawid-web.git
git push -u origin main
```

Les fois suivantes, à la fin de chaque séance : `git add .`, `git commit -m "..."`, `git push`.

## Ce qu'il y a dans ce dossier

| Dossier | Contenu |
| --- | --- |
| `fournis/src/` | à copier au début : les données des salons (`donnees/salons.js`), `lib/format.js` (« 135 DH », « 1 h 30 »), `lib/theme.js` (les couleurs du salon), `styles.css`, et `App.jsx` (la page de départ) |
| `etapes/etape-1/src/` à `etapes/etape-4/src/` | le code à la fin de chaque étape, pour rattraper |
| `L1_page_salon.pdf` | les diapos de la séance, avec tout le code et toutes les commandes |

La correction des exercices B et C (`etapes/fin/`) est publiée après la séance.

## Les problèmes fréquents

| Ce que vous voyez | Solution |
| --- | --- |
| la page ne change pas | enregistrer le fichier (Ctrl+S), ou cocher *Fichier*, *Enregistrement automatique* |
| page blanche | F12, onglet *Console* : lire la **première** ligne rouge, et sa ligne de code |
| `npm.ps1 ne peut pas être chargé` | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, puis rouvrir le terminal |
| `Copy-Item` : chemin introuvable | `mawid-web` et `tp-framewok-web` ne sont pas côte à côte : adapter le chemin, ou copier à la main |
| `git push` refuse le mot de passe | accepter la connexion par le navigateur proposée par VS Code |

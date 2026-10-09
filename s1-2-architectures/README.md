# TP S1.2 : la même page en MPA, en SPA et en SSR

La même liste d'offres de BabStage (l'ancien cas fil rouge : les données de cette démo sont dans `donnees-babstage.json`), construite de trois façons, pour **voir** la différence
au lieu de l'imaginer. Elle accompagne la section « Trois façons de construire une
application web » du chapitre 1 du cours (exercice AR.1 : le détective).

| Adresse | Architecture | Qui fabrique le HTML ? |
| --- | --- | --- |
| `/mpa/offres` | multipage | le serveur, à chaque clic (même un clic sur ☆ recharge la page) |
| `/spa/offres` | monopage | le navigateur : la page arrive vide, JavaScript la remplit avec les données de `/api/...` |
| `/ssr/offres` | rendu serveur | le serveur pour la première page, puis le navigateur après l'« hydratation » |

Les trois versions utilisent **le même fichier de vues** (`public/vues.mjs`) : le serveur
l'exécute pour les versions MPA et SSR, le navigateur pour les versions SPA et SSR.
C'est exactement ce que fait Next.js avec des composants React (S11).

## Lancer

Avec Node.js (20 ou plus), sans rien installer d'autre :

```bash
cd s1-2-architectures
node serveur.mjs
# puis ouvrir http://localhost:3002
```

Sans Node.js, avec Docker, depuis la racine du dépôt :

```bash
docker compose up demo
# puis ouvrir http://localhost:3002
```

Réglages (variables d'environnement) :

| Variable | Défaut | Effet |
| --- | --- | --- |
| `PORT` | 3002 | le port d'écoute |
| `LATENCE` | 400 | délai de l'API, en millisecondes : le « Chargement… » de la SPA |
| `JS_DELAI` | 1500 | délai avant l'envoi du JavaScript des versions SPA et SSR (un gros fichier sur un réseau lent) : l'écran blanc de la SPA, la page « visible mais pas encore cliquable » du SSR |

Sous PowerShell : `$env:JS_DELAI=4000; node serveur.mjs`. Avec Docker : `JS_DELAI=4000 docker compose up demo`.

## Exercice AR.1 : le détective (15 minutes, à deux)

Ouvrez les outils de développement (F12), onglet **Network**, et cochez « Disable cache ».
Pour chacune des trois versions, remplissez le tableau.

| Question | MPA | SPA | SSR |
| --- | --- | --- | --- |
| 1. **Ctrl+U** (code source) : les titres des offres sont-ils dans le HTML reçu ? | | | |
| 2. Rechargez (F5) : que voit-on pendant la première seconde ? | | | |
| 3. Cliquez sur une offre. Dans Network, quel type de requête part : `document` (une page) ou `fetch` (des données) ? | | | |
| 4. Cliquez sur ☆. Une requête part-elle ? La page se recharge-t-elle ? | | | |
| 5. En SSR, cliquez sur ☆ **avant** que le bandeau devienne vert. Que se passe-t-il ? Pourquoi ? | | | |
| 6. Désactivez JavaScript (F12, Ctrl+Maj+P, « Disable JavaScript »), rechargez : que reste-t-il ? | | | |

Pour finir : le **témoin** en bas de chaque page dit qui a fabriqué le HTML affiché. Naviguez
dans la version SSR : quand passe-t-il de « le serveur » à « le navigateur » ?

**À rendre** : le tableau rempli, et, en trois phrases, votre réponse à la question « où, et quand, le HTML est-il fabriqué ? » pour chacune des trois versions.

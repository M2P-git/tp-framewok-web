# TP S1.4 : du comment au quoi (exercice ID.1, 10 minutes, à deux)

Le but : réécrire trois boucles en style **déclaratif** (on dit *quoi* obtenir, pas *comment*).

Les trois fonctions sont dans `declaratif.js`. Pour chacune, le code **impératif** est donné en
commentaire. Remplacez le corps de la fonction par une version **déclarative** : sans boucle
`for` ni `while`, sans variable déclarée avec `let`, avec les méthodes de tableau (`map`,
`filter`, `reduce`, `some`…) et, si besoin, `new Set`.

| Fonction | Ce qu'elle renvoie |
| --- | --- |
| `villes(offres)` | les villes des offres, **sans doublon** |
| `totalGratifications(offres)` | la somme des champs `stipendMad` |
| `aUnFavori(offres, favoris)` | `true` si au moins une offre est dans l'ensemble `favoris` |

## Vérifier

Il faut Node.js (version 20 ou plus), ou Docker (voir le README à la racine du dépôt).

```bash
node --test declaratif.test.js
```

Le test vérifie deux choses : que les fonctions renvoient le bon résultat, **et** que le code est
bien déclaratif (pas de `for`, de `while` ni de `let` dans les fonctions).

## À rédiger (à deux, 2 minutes)

Pour **une** des trois fonctions, expliquez en une phrase ce que la version déclarative **cache**
(où est passée la boucle ?), et un cas où vous préféreriez quand même l'impératif.

# TP S1.3 : déboguer grâce au modèle d'exécution

Huit bugs courts, un fichier chacun. Pour chacun, il faut **expliquer** le bug avec le modèle
d'exécution de JavaScript vu en cours (la pile d'appels, le fil unique, la boucle
d'événements et ses deux files), puis le **corriger**. Les consignes détaillées sont au début
de chaque fichier.

| Exercice | Fichier | Notion du cours | Outil à utiliser | Lancer | Quand |
| --- | --- | --- | --- | --- | --- |
| BUG.1 Lire une trace de pile | `01-trace-de-pile/index.html` | la pile d'appels | la console | ouvrir dans le navigateur | en séance |
| BUG.2 Le débordement de pile | `02-debordement.js` | la pile d'appels | la console | `node 02-debordement.js` | chez vous |
| BUG.3 Dans quel ordre ? | `03-ordre.js` | la boucle d'événements | votre tête, puis la console | `node 03-ordre.js 1` (à 5) | en séance |
| BUG.4 La page gelée | `04-page-gelee.html` | le fil unique | l'onglet Performance | ouvrir dans le navigateur | en séance |
| BUG.5 Trop tôt | `05-trop-tot.html` | la boucle d'événements | la console | ouvrir dans le navigateur | chez vous |
| BUG.6 Le filet troué | `06-try-catch.js` | la pile et la boucle | la console | `node 06-try-catch.js 1` (ou 2) | chez vous |
| BUG.7 4, 4, 4 | `07-var-let.js` | la boucle et les fermetures | la console | `node 07-var-let.js` | chez vous |
| BUG.8 Le débogueur pas à pas | `08-debogueur.html` | la pile d'appels | l'onglet Sources | ouvrir dans le navigateur | chez vous |

Les fichiers `.js` fonctionnent aussi dans la console du navigateur (F12) : collez le code.

## À rendre

Pour chaque bug, dans un fichier `reponses.md` :

1. le **symptôme** observé (le message exact, ou ce qui ne va pas) ;
2. l'**explication**, avec les mots du cours (pile, fil, tâche, microtâche…) et, si besoin, un dessin de la pile ou des files ;
3. la **correction**, et la preuve qu'elle marche (ce qui s'affiche après).

## Sans Node.js : Docker

Depuis la racine du dépôt :

```bash
docker compose run --rm labo 02-debordement.js
docker compose run --rm labo 03-ordre.js 2
```

## La méthode, pour tous les bugs

1. **Lire** le message et la trace : quoi, où, qui a appelé.
2. **Situer** le bug dans le modèle : la pile (qui appelle qui), la file (quand ça s'exécute), le fil unique (qui bloque qui).
3. **Vérifier** avec un outil plutôt que deviner : un point d'arrêt, `console.trace()`, l'onglet Performance.
4. **Corriger**, puis relancer pour vérifier.

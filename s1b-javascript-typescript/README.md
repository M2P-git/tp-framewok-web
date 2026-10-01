# TP S1 bis : révision générale de JavaScript et de TypeScript

Des exercices **qui se vérifient tout seuls** : chaque fichier contient une consigne en tête et
des fonctions à écrire, et un test dit tout de suite si c'est juste. On écrit, on lance le test,
on lit le message, on corrige.

Les notions sont dans le cours (PDF de la séance 1 bis). Ici, on **s'exerce**.

## Préparer

- **JavaScript** (bases, asynchrone, notions pour React, entretien) : il faut seulement Node.js
  (version 20 ou plus ; la 22 est recommandée). Aucune installation de paquet.
- **TypeScript** : une fois, `npm install` dans ce dossier (installe le compilateur `tsc`).
  Sans installation, le [TypeScript Playground](https://www.typescriptlang.org/play) accepte le
  contenu d'un fichier, en mode strict.

Sans Node.js, voir la section Docker du README à la racine du dépôt.

## Les exercices

| Série | Dossier | Fichiers | Vérifier |
| --- | --- | --- | --- |
| BS.1 à BS.7 : les bases (variables, conditions, boucles, fonctions, tableaux, objets, chaînes) | `bases/` | `01-variables.js` à `07-chaines.js` | `npm run test:bases` |
| TS.1 à TS.5 : ce que TypeScript ajoute (annoter, unions, valeurs absentes, génériques, promesses) | `typescript/` | `01-annoter.ts` à `05-promesse.ts` | `npm run ts 3` (un exercice), `npm run ts:tout` |
| AS.1 à AS.5 : promesses, `async` et `await` | `async/` | `01-attendre.js` à `05-promettre.js` | `npm run test:async` |
| RE.1 à RE.5 : les notions « à la React » (immutabilité, données dérivées, rendu conditionnel, JSX, modules) | `react/` | `01-immutabilite.js` à `05-modules.js` | `npm run test:react` |
| EN.1 à EN.3 : l'entretien en pratique (fermetures, anti-rebond, récursion) | `entretien/` | `01-fermetures.js` à `03-recursion.js` | `npm run test:entretien` |
| EN.4 : l'entretien blanc | à deux | | voir la consigne dans le cours |

Tout d'un coup : `npm test` (JavaScript) puis `npm run ts:tout` (TypeScript).

Un seul exercice, sans npm : `node --test bases/03-boucles.test.js`.

## Comment travailler

1. **Lisez** la consigne en tête du fichier. Les exemples d'usage sont déjà écrits.
2. **Écrivez de tête d'abord**, puis le code. Pour les exercices de prédiction (AS.4), le test ne donne pas la réponse : il dit seulement si elle est juste.
3. **Lancez** le test. Un test rouge n'est pas un échec : le message dit ce qui est attendu et ce qui a été reçu.
4. Quand tout est vert, relisez votre code : est-ce le plus simple possible ? Pourriez-vous l'écrire sans aide, demain ?
5. Les corrections sont publiées après la séance.

## Dans la séance, et chez vous

| En séance | Chez vous |
| --- | --- |
| BS.1, BS.2 ; TS.1 à TS.3 ; AS.4 | la fin des séries BS, TS et AS ; RE.1 à RE.5 ; EN.1 à EN.3 |

Le TP **S1.3** (`../s1-3-debogage`) complète le travail sur le modèle d'exécution.

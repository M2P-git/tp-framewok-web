# TP S1 bis : le JavaScript dont Mawid a besoin

Des exercices **qui se vérifient tout seuls** : chaque fichier contient une consigne en tête et
des fonctions à écrire, et un test dit tout de suite si c'est juste. On écrit, on lance le test,
on lit le message, on corrige.

**Pourquoi le JavaScript avant React ?** Parce que React, Angular, Vue et Next.js ne sont que du
JavaScript organisé. Un composant React est une fonction ; son état est un objet qu'on remplace
au lieu de le modifier ; une liste à l'écran est un `map` ; un chargement est une promesse. Quand
quelque chose casse, l'erreur est presque toujours une erreur de JavaScript. Et quand une IA vous
propose du code, c'est votre JavaScript qui vous permet de dire s'il est juste.

## La série P : le projet d'abord (prioritaire)

Chaque fonction de la série P **servira telle quelle** dans votre application Mawid : copiez vos
fichiers terminés dans `src/lib/` de votre projet React, en S2. Vous ne faites pas des exercices :
vous écrivez la logique métier de votre futur portfolio, testée avant même d'avoir un écran.

| Exercice | Fichier | Ce que vous écrivez | La notion pour React |
| --- | --- | --- | --- |
| P.1 | `projet/01-prix.js` | le résumé « 2 prestations · 230 DH · 1 h 15 » | les **données dérivées** (`reduce`, gabarits) |
| P.2 | `projet/02-selection.js` | ajouter ou retirer une prestation de la sélection | l'**immutabilité** (copier au lieu de modifier) |
| P.3 | `projet/03-catalogue.js` | rechercher, regrouper et trier les prestations | **transformer des listes** (`filter`, `map`, `sort`) ; le piège du `0` |
| P.4 | `projet/04-creneaux.js` | calculer les créneaux libres d'une journée | des **fonctions pures**, faciles à tester ; le piège des fuseaux horaires |
| P.5 | `projet/05-agenda.js` | l'agenda du pro, les statuts, les statistiques | les **objets**, la **machine à états** |
| P.6 | `projet/06-asynchrone.js` | charger une page, limiter l'attente, réessayer, réserver | les **promesses**, `async`/`await`, les **erreurs** |

Vérifier : `npm run test:projet`, ou un seul exercice : `node --test projet/04-creneaux.test.js`.

Les données des tests sont dans `donnees-mawid.js` : un salon, huit prestations et huit
rendez-vous, de la même forme que les vraies données (`../donnees/db.json`).

## Les autres séries : réviser les bases (au choix)

Si un exercice de la série P vous bloque, la série de révision correspondante reprend la notion
pas à pas. Faites-la, puis revenez à la série P.

| Série | Dossier | Fichiers | Vérifier | Utile avant |
| --- | --- | --- | --- | --- |
| BS.1 à BS.7 : les bases (variables, conditions, boucles, fonctions, tableaux, objets, chaînes) | `bases/` | `01-variables.js` à `07-chaines.js` | `npm run test:bases` | P.1 à P.3 |
| TS.1 à TS.5 : ce que TypeScript ajoute (annoter, unions, valeurs absentes, génériques, promesses) | `typescript/` | `01-annoter.ts` à `05-promesse.ts` | `npm run ts 3` (un exercice), `npm run ts:tout` | S2 |
| AS.1 à AS.5 : promesses, `async` et `await` | `async/` | `01-attendre.js` à `05-promettre.js` | `npm run test:async` | P.6 |
| RE.1 à RE.5 : les notions « à la React » (immutabilité, données dérivées, rendu conditionnel, JSX, modules) | `react/` | `01-immutabilite.js` à `05-modules.js` | `npm run test:react` | P.2, S2 |
| EN.1 à EN.3 : l'entretien en pratique (fermetures, anti-rebond, récursion) | `entretien/` | `01-fermetures.js` à `03-recursion.js` | `npm run test:entretien` | l'entretien technique |

Ces séries portent sur les offres de BabStage, l'ancien cas fil rouge : les notions sont les mêmes.

## Préparer

- **JavaScript** : il faut seulement Node.js (version 20 ou plus ; la 22 ou la 24 est
  recommandée). Aucune installation de paquet.
- **TypeScript** : une fois, `npm install` dans ce dossier (installe le compilateur `tsc`).
  Sans installation, le [TypeScript Playground](https://www.typescriptlang.org/play) accepte le
  contenu d'un fichier, en mode strict.

Sans Node.js, voir la section Docker du README à la racine du dépôt.

Tout d'un coup : `npm test` (JavaScript) puis `npm run ts:tout` (TypeScript).

## Comment travailler

1. **Lisez** la consigne en tête du fichier, puis le fichier de test : il montre des exemples
   d'usage précis. Un test est une **spécification** : il dit ce que la fonction doit faire.
2. **Écrivez de tête d'abord**, puis le code.
3. **Lancez** le test. Un test rouge n'est pas un échec : le message dit ce qui est attendu et ce
   qui a été reçu.
4. Quand tout est vert, relisez votre code : est-ce le plus simple possible ? Pourriez-vous
   l'écrire sans aide, demain ?
5. **L'IA, oui, mais après.** Écrivez d'abord votre version. Ensuite seulement, demandez à un
   assistant de la relire (« trouve un cas où ma fonction se trompe ») et notez dans votre
   journal IA ce que vous avez appris. Une fonction que l'IA écrit à votre place, c'est un
   exercice que vous n'avez pas fait.
6. Les corrections sont publiées après la séance.

## Dans la séance, et chez vous

| En séance | Chez vous |
| --- | --- |
| P.1, P.2, P.4 (au moins `genererCreneaux`) | P.3, la fin de P.4, P.5 et P.6 ; les séries de révision utiles pour vous |

Le TP **S1.3** (`../s1-3-debogage`) complète le travail sur le modèle d'exécution.

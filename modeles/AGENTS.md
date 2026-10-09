# Règles du projet pour les assistants IA

> À placer à la racine du dépôt (`AGENTS.md`). La plupart des assistants de programmation
> (Copilot, Claude Code, Cursor, Codex...) lisent ce fichier avant d'écrire du code : c'est la
> façon la plus efficace de leur donner le **contexte** du projet, une fois pour toutes, au lieu
> de le répéter dans chaque demande. Il sert aussi aux humains qui rejoignent le projet.
> Adaptez-le : il doit décrire VOTRE projet.

## Le projet

Mawid : réservation en ligne pour les petits commerces de service au Maroc (salons, barbiers,
hammams, instituts, kinés, coachs). Interface en français. Les utilisateurs sont surtout sur
téléphone.

## La pile

- React 19, TypeScript (strict), Vite. Pas de Create React App.
- Données serveur : TanStack Query. Pas de `fetch` dans un `useEffect`.
- Formulaires : React Hook Form + Zod.
- Routes : React Router. État partagé : Redux Toolkit (le brouillon de réservation) et un
  contexte (la session).
- Tests : Vitest + Testing Library. Chaque fonction de `src/lib/` a ses tests.

## Les règles de code

- Composants fonctionnels uniquement, un composant par fichier, nommé en PascalCase.
- Aucune couleur, police ou arrondi en dur : utiliser les variables CSS de `styles.css`.
- Aucun texte d'interface en dur dans la logique : les textes sont dans les composants ou
  dans `src/textes.ts`.
- Ne jamais stocker ce qui peut se calculer (données dérivées).
- Ne jamais modifier l'état : en créer une nouvelle version.
- Toute requête passe par `src/api/client.ts`.
- Les noms de variables et de fonctions métier sont en français ; les champs des données
  restent en anglais, comme l'API.

## Ce que l'assistant ne doit PAS faire

- Ajouter une dépendance npm sans le dire et sans justification.
- Écrire une clé d'API, un mot de passe ou un secret dans le code.
- Modifier les tests pour les faire passer.
- Réécrire un fichier entier quand une modification locale suffit.

## Comment vérifier

```bash
npm run typecheck && npm test && npm run build
```

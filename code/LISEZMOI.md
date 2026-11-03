# Le code des séances : démos et exercices en classe

Ce dossier contient le code montré pendant les séances 2 et 3 : les démos et les **fichiers de
départ** des exercices faits en classe. Les chemins sont ceux écrits dans les diapos : quand une
diapo dit `code/s3-donnees/1-fetch.html`, le fichier est ici.

Pour savoir **ce que votre page doit afficher** à la fin d'un exercice, ouvrez le rendu attendu :

| Séance | Rendu attendu |
| --- | --- |
| S2 : Découvrir React | [`rendu-attendu/s2.html`](rendu-attendu/s2.html) |
| S3 : Données et formulaires | [`rendu-attendu/s3.html`](rendu-attendu/s3.html) |
| Préparer le contrôle 1 | [`rendu-attendu/controle-1.html`](rendu-attendu/controle-1.html) |

Ce sont des images figées de l'écran : elles montrent le résultat, pas le code.

## Ouvrir les fichiers

- Les `.html` s'ouvrent **par double-clic**, sans rien installer et sans Internet : React et Babel
  sont dans `s2-avec-react/lib/`.
- Les `.jsx` sont des `src/App.jsx` de projet Vite : copiez-les dans votre projet, avec le
  `App.css` du même dossier, puis `npm run dev`.
- **Séance 3** : les pages demandent leurs données à l'API simulée. Lancez-la d'abord, dans un
  second terminal, à la racine du dépôt : `node api-simulee/serveur.mjs`. Sans elle, les pages
  affichent… « Le serveur ne répond pas » (notion 3).

## Les fichiers de départ des exercices

| Exercice | Fichier de départ |
| --- | --- |
| S2, exercice 3 : un compteur de plus | `s2-sans-react/3-donnees-d-abord.html` |
| S2, exercice 6 : votre projet tourne | `s2-avec-react/projet-vite/src/` (`App.jsx`, `App.css`) |
| S2, exercices 9 et 10 : une carte pour toutes, le bouton favori | `s2-avec-react/jsx/carte.jsx` |
| S2, exercice 11 : la liste des noms | `s2-avec-react/jsx/liste-depart.jsx` |
| S3, exercice 2 : les prix, et un autre salon | `s3-donnees/1-fetch.html` |
| S3, exercice 3 : un salon inconnu | `s3-donnees/2-erreurs.html` |
| S3, exercice 4 : les prestations depuis le serveur | `s3-donnees/jsx/liste-depart.jsx` |
| S3, exercice 5 : le message d'erreur | `s3-donnees/jsx/charger.jsx` |
| S3, exercice 6 : chercher un mot | `s3-donnees/jsx/annuaire.jsx` |
| S3, exercice 7 : le champ « Nom » | `s3-donnees/jsx/formulaire.jsx` |
| S3, exercice 8 : la case d'accord obligatoire | `s3-donnees/jsx/valider.jsx` |
| S3, exercices 9 à 11 : réserver, le 409, le 422 | `s3-donnees/jsx/reserver.jsx` |

Les exercices du contrôle 1 se font sur papier : il n'y a pas de fichier de départ.

## Les dossiers

| Dossier | Contenu |
| --- | --- |
| `s2-sans-react/` | la carte, le filtre et le compteur écrits en JavaScript pur (S2, notions 1 à 3) |
| `s2-avec-react/` | les mêmes avec React : `jsx/` (le code), les pages à ouvrir par double-clic, `lib/` (React et Babel), `projet-vite/src/` |
| `s3-donnees/` | `fetch` sans React (`1-fetch.html`, `2-erreurs.html`), puis les `App.jsx` de la séance 3 dans `jsx/`, et leurs pages à ouvrir par double-clic |
| `rendu-attendu/` | ce que chaque exercice doit afficher |

Les pages à ouvrir par double-clic sont produites à partir des `.jsx` par `generer.py` : si vous
modifiez un `.jsx`, ouvrez-le plutôt dans votre projet Vite.

# Bibliothèques des démos React, pour travailler sans connexion

Les fichiers `../*.html` chargent React et Babel depuis ce dossier : ils s'ouvrent par double-clic, sans Internet. Le cours HTML (`slides/quarto/`) les embarque aussi, pour ses démos vivantes.

| Fichier | Version | Source | Licence |
| --- | --- | --- | --- |
| `react.development.js` | React 18.3.1 | `https://unpkg.com/react@18.3.1/umd/react.development.js` | MIT |
| `react-dom.development.js` | React DOM 18.3.1 | `https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js` | MIT |
| `babel.min.js` | Babel standalone 7.24.0 | `https://unpkg.com/@babel/standalone@7.24.0/babel.min.js` | MIT |

Versions de développement, à dessein : elles affichent dans la console les avertissements dont parle le cours (la clé `key` manquante, un composant au nom en minuscule). React 19 ne publie plus ces fichiers « UMD » : la version 18.3.1 est la dernière qui se charge ainsi, sans outil. En TP, le projet Vite utilise React 19.

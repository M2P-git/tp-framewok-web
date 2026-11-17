# Séance L1

## Contenu du dossier

| Dossier | Contenu |
| --- | --- |
| `fournis/src/` | fichiers à copier dans le dossier `src/` du projet `mawid-web` : données des salons (`donnees/salons.js`), mise en forme des prix et des durées (`lib/format.js`), thème des salons (`lib/theme.js`), feuille de style (`styles.css`), page de départ (`App.jsx`) |
| `etapes/etape-1/src/` à `etapes/etape-4/src/` | code du projet à la fin de chaque étape |

## Copier les fichiers dans le projet

Les commandes supposent que `mawid-web` et `tp-framewok-web` se trouvent dans le même dossier ;
elles s'exécutent à la racine de `mawid-web`, après `git pull` dans `tp-framewok-web`.

Fichiers fournis, Windows (PowerShell) :

```powershell
Copy-Item -Recurse -Force ..\tp-framewok-web\live\L1\fournis\src\* .\src\
```

Fichiers fournis, macOS et Linux :

```bash
cp -R ../tp-framewok-web/live/L1/fournis/src/* src/
```

Code d'une étape (remplacer `etape-2` par l'étape concernée) :

```powershell
Copy-Item -Recurse -Force ..\tp-framewok-web\live\L1\etapes\etape-2\src\* .\src\
```

```bash
cp -R ../tp-framewok-web/live/L1/etapes/etape-2/src/* src/
```

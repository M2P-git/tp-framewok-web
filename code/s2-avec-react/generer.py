"""Produit les démos React à ouvrir par double-clic à partir des fichiers jsx/*.jsx.

Les .jsx sont écrits comme le src/App.jsx d'un projet Vite (import, export default App) :
c'est le code que voient les étudiants, dans la diapo comme dans leur projet. Pour qu'une page
s'ouvre sans outil, la transformation est la même que dans le cours HTML (mawid-demo.html) :
  import { useState } from 'react'  ->  const { useState } = React;
  import './App.css'                ->  le CSS est copié dans la page
  export default function App       ->  function App, puis l'affichage dans <div id="root">
Copie aussi jsx/carte.jsx et jsx/App.css dans projet-vite/src/ (App.jsx, App.css).

Exécution : python3 generer.py   (construire.sh, dans slides/quarto, le lance)
"""
import re
import shutil
from pathlib import Path

ICI = Path(__file__).resolve().parent
JSX = ICI / "jsx"

# fichier produit : (source, titre de la page)
DEMOS = {
    "1-une-carte.html": ("carte.jsx", "Avec React 1 : une carte"),
    "2-le-filtre.html": ("filtre.jsx", "Avec React 2 : le filtre"),
    "3-compteur.html": ("compteur.jsx", "Avec React 3 : le compteur"),
    "4-liste-depart.html": ("liste-depart.jsx", "Avec React 4 : la liste des prestations"),
}

STYLE_PAGE = "body { font-family: system-ui, sans-serif; max-width: 420px; margin: 1.5rem auto; padding: 0 1rem; }"

PAGE = """<!doctype html>
<!--
  {titre}. Généré par generer.py depuis jsx/{source} : pour changer le code, modifier le .jsx.
  Le code est celui d'un src/App.jsx de projet Vite. Pour s'ouvrir par double-clic, sans outil
  ni connexion, la page charge React et Babel (qui traduit le JSX) depuis lib/, à côté.
-->
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>{titre}</title>
    <style>
{style}
    </style>
    <script src="lib/react.development.js"></script>
    <script src="lib/react-dom.development.js"></script>
    <script src="lib/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
{code}
    </script>
  </body>
</html>
"""


def vers_navigateur(jsx):
    """Le code d'un App.jsx, prêt à tourner dans une page avec React chargé en global."""
    noms = []

    def importer(m):
        noms.extend(n.strip() for n in m.group(1).split(",") if n.strip())
        return ""

    code = re.sub(r"^[ \t]*import\s*\{([^}]*)\}\s*from\s*['\"]react['\"];?[ \t]*\n?", importer, jsx, flags=re.M)
    code = re.sub(r"^[ \t]*import\s+['\"][^'\"]+\.css['\"];?[ \t]*\n?", "", code, flags=re.M)
    code = re.sub(r"export\s+default\s+function\s+App\b", "function App", code)
    entete = f"const {{ {', '.join(noms)} }} = React;\n" if noms else ""
    return entete + code.rstrip() + "\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);"


def main():
    css = (JSX / "App.css").read_text(encoding="utf-8")
    style = "\n".join("      " + ligne if ligne else "" for ligne in (STYLE_PAGE + "\n" + css).strip().splitlines())
    for page, (source, titre) in DEMOS.items():
        code = vers_navigateur((JSX / source).read_text(encoding="utf-8"))
        code = "\n".join("      " + ligne if ligne else "" for ligne in code.splitlines())
        (ICI / page).write_text(PAGE.format(titre=titre, source=source, style=style, code=code), encoding="utf-8")
        print("produit :", page)
    projet = ICI / "projet-vite" / "src"
    shutil.copyfile(JSX / "carte.jsx", projet / "App.jsx")
    shutil.copyfile(JSX / "App.css", projet / "App.css")
    print("copié : projet-vite/src/App.jsx et App.css")


if __name__ == "__main__":
    main()

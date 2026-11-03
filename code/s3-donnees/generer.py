"""Produit les démos React de la séance 3 à ouvrir par double-clic, depuis jsx/*.jsx.

Même transformation que pour la séance 2 (../s2-avec-react/generer.py, dont on reprend le code) :
les .jsx sont écrits comme le src/App.jsx d'un projet Vite. React et Babel sont pris dans
../s2-avec-react/lib/ : une seule copie pour les deux séances.
Les démos chargent leurs données depuis l'API simulée : node code/api-simulee/serveur.mjs.

Exécution : python3 generer.py   (construire.sh, dans slides/quarto, le lance)
"""
import importlib.util
from pathlib import Path

ICI = Path(__file__).resolve().parent
JSX = ICI / "jsx"

_spec = importlib.util.spec_from_file_location("generer_s2", ICI.parent / "s2-avec-react" / "generer.py")
S2 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(S2)

# fichier produit : (source, titre de la page)
DEMOS = {
    "3-liste-depart.html": ("liste-depart.jsx", "S3, démo 3 : le départ de l'exercice 4"),
    "4-charger.html": ("charger.jsx", "S3, démo 4 : charger avec useEffect"),
    "5-etats.html": ("etats.jsx", "S3, démo 5 : chargement, erreur, vide"),
    "6-annuaire.html": ("annuaire.jsx", "S3, démo 6 : les établissements d'une ville"),
    "7-formulaire.html": ("formulaire.jsx", "S3, démo 7 : un formulaire contrôlé"),
    "8-valider.html": ("valider.jsx", "S3, démo 8 : valider avant d'envoyer"),
    "9-reserver.html": ("reserver.jsx", "S3, démo 9 : réserver, et les réponses du serveur"),
}


def main():
    css = (JSX / "App.css").read_text(encoding="utf-8")
    style = "\n".join("      " + ligne if ligne else "" for ligne in (S2.STYLE_PAGE + "\n" + css).strip().splitlines())
    for page, (source, titre) in DEMOS.items():
        code = S2.vers_navigateur((JSX / source).read_text(encoding="utf-8"))
        code = "\n".join("      " + ligne if ligne else "" for ligne in code.splitlines())
        html = S2.PAGE.format(titre=titre, source=source, style=style, code=code)
        html = html.replace('src="lib/', 'src="../s2-avec-react/lib/').replace("depuis lib/, à côté", "depuis ../s2-avec-react/lib/")
        (ICI / page).write_text(html, encoding="utf-8")
        print("produit :", page)


if __name__ == "__main__":
    main()

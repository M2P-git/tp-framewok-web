# TP S1.1 : la douleur du JavaScript pur (exercice 1.2, 25 minutes, à deux)

Aucune installation : ouvrez `index.html` dans votre navigateur (double-clic).
Le code à modifier est dans `app.js`. Rechargez la page (F5) après chaque modification.

1. **Observez (3 min).** Marquez deux offres comme favorites. Le compteur en haut à droite passe à 2.
2. **Lisez `app.js` (5 min).** Où le programme retient-il qu'une offre est favorite ? Où retient-il le nombre de favoris ?
3. **Ajoutez le filtre par ville (10 min).** Le menu « Ville » existe déjà dans la page. Quand on choisit une ville, seules les offres de cette ville doivent s'afficher. Indice : écoutez l'événement `change` du menu, videz la liste (`liste.innerHTML = ''`), puis recréez les cartes des offres de la ville choisie.
4. **Testez (2 min).** Marquez deux favoris, filtrez sur « Rabat », puis revenez à « Toutes les villes ». Les étoiles sont-elles toujours là ? Que dit le compteur ?
5. **Case « Seulement mes favoris » (5 min).** Essayez de la faire fonctionner. Qu'est-ce qui vous manque ?

À la fin, notez en une phrase **pourquoi** le compteur et les étoiles ne sont plus d'accord. Nous en discuterons ensemble.

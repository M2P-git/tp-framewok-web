# TP S1.1 : la douleur du JavaScript pur (exercice 1.2, 25 minutes, à deux)

Le client de Mawid choisit des prestations sur la page d'un salon ; en haut, la page affiche
combien il en a choisi, et le total. Cette page est écrite en JavaScript « à la main », sans
framework. Vous allez lui ajouter un filtre, et voir ce qui casse.

Aucune installation : ouvrez `index.html` dans votre navigateur (double-clic).
Le code à modifier est dans `app.js`. Rechargez la page (F5) après chaque modification.

1. **Observez (3 min).** Ajoutez deux prestations à votre sélection. Le compteur passe à 2, le total se met à jour.
2. **Lisez `app.js` (5 min).** Où le programme retient-il qu'une prestation est choisie ? Où retient-il le nombre de prestations et le total ?
3. **Ajoutez le filtre par catégorie (10 min).** Le menu « Catégorie » existe déjà dans la page. Quand on choisit une catégorie, seules ses prestations doivent s'afficher. Indice : écoutez l'événement `change` du menu, videz la liste (`liste.innerHTML = ''`), puis recréez les cartes des prestations de la catégorie choisie.
4. **Testez (2 min).** Ajoutez « Coupe femme » et « Coloration racines », filtrez sur « Coupe », puis revenez à « Toutes les catégories ». Les coches sont-elles toujours là ? Que disent le compteur et le total ? Ajoutez de nouveau « Coloration racines » : que devient le total ?
5. **Case « Seulement ma sélection » (5 min).** Essayez de la faire fonctionner. Qu'est-ce qui vous manque ?

À la fin, notez en une phrase **pourquoi** l'écran et les chiffres ne sont plus d'accord, et ce
que cela coûterait si ce total était celui d'une vraie réservation. Nous en discuterons ensemble :
c'est exactement le problème que React résout.

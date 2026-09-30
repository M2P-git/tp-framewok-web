// Exercice BUG.7 : trois fois la même offre (10 minutes)
// Lancer : node 07-var-let.js   (ou coller le code dans la console du navigateur)
//
// On veut afficher les numéros 1, 2 et 3, chacun 100 ms plus tard.

for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log('offre numéro', i), 100);
}

// 1. Prédisez l'affichage, puis lancez. Qu'obtenez-vous ?
// 2. Quand les trois fonctions s'exécutent-elles : pendant la boucle, ou après ?
//    Que vaut i à ce moment-là ?
// 3. Combien de variables i existe-t-il avec var ? Et avec let ?
//    Remplacez var par let, et relancez.
// 4. Pourquoi ce bug a-t-il besoin de DEUX notions du cours pour s'expliquer
//    (la boucle d'événements et les fermetures) ?

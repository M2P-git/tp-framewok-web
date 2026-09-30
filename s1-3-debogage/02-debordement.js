// Exercice BUG.2 : le débordement de pile (10 minutes)
// Lancer : node 02-debordement.js   (ou coller le code dans la console du navigateur)
//
// Combien de pages faut-il pour afficher `total` offres, `parPage` par page ?
function nombreDePages(total, parPage) {
  if (total === 0) return 0;
  return 1 + nombreDePages(total - parPage, parPage);
}

console.log('24 offres, 12 par page :', nombreDePages(24, 12), 'pages');
console.log('25 offres, 12 par page :', nombreDePages(25, 12), 'pages');

// 1. Avant de lancer : combien de pages attendez-vous pour 24 offres ? pour 25 ?
// 2. Lancez. Le premier appel fonctionne, le second provoque une erreur.
//    Recopiez son nom et son message. Que veut dire « call stack » en français ?
// 3. Regardez la trace : quelle ligne se répète ? Combien d'« assiettes » la pile
//    contient-elle, à peu près, au moment de l'erreur ?
// 4. Suivez l'appel nombreDePages(25, 12) à la main : quelles valeurs prend `total` ?
//    Pourquoi la fonction ne s'arrête-t-elle jamais ?
// 5. Corrigez le cas de base, puis vérifiez : 0, 1, 12, 13, 24 et 25 offres.
//    Bonus : écrivez la même fonction sans récursion, en une ligne (Math.ceil).

function formaterEntreprise(offre) {
  return offre.company.name.toUpperCase();
}
function creerLigne(offre) {
  const entreprise = formaterEntreprise(offre);
  return `<li>${offre.title} (${entreprise})</li>`;
}
function afficherOffres(offres) {
  document.querySelector('#liste').innerHTML = offres.map(creerLigne).join('');
}
afficherOffres(OFFRES);

// Exercice BUG.1 : lire une trace de pile (10 minutes)
// Le code est en haut du fichier pour que les numéros de ligne restent courts.
// Les offres (OFFRES) sont dans donnees.js, chargé avant ce fichier.
//
// 1. Ouvrez index.html dans le navigateur, puis la console (F12, onglet « Console »).
//    Recopiez la première ligne du message d'erreur. Que dit-elle, en français ?
// 2. Lisez la trace de haut en bas. Dans quelle fonction, à quelle ligne et à quelle
//    colonne l'erreur se produit-elle ? Cliquez sur « app.js:2 » : que se passe-t-il ?
// 3. Dessinez la pile d'appels au moment de l'erreur (une assiette par fonction).
//    Quelle ligne de la trace ne correspond pas à votre code ? Pourquoi ?
// 4. Trouvez le bug (comparez avec les champs d'une offre, dans donnees.js), corrigez-le,
//    rechargez la page (F5).
// 5. Pour aller plus loin : ajoutez console.trace('ici') au début de formaterEntreprise,
//    rechargez, et comparez avec la trace de l'erreur.

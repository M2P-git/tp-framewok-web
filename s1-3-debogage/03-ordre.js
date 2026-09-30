// Exercice BUG.3 : dans quel ordre ? (15 minutes)
// Lancer : node 03-ordre.js 1   (le numéro de l'énigme, de 1 à 5)
// Dans le navigateur : collez une fonction dans la console, puis appelez-la : enigme1()
//
// Pour chaque énigme : ÉCRIVEZ votre prédiction dans le commentaire AVANT de lancer.
// Si vous vous trompez, dessinez la pile et les deux files (tâches, microtâches),
// comme sur la figure « la boucle d'événements pas à pas » du cours.

function enigme1() {
  // Ma prédiction : ...
  console.log('A');
  setTimeout(() => console.log('B'), 0);
  console.log('C');
}

function enigme2() {
  // Ma prédiction : ...
  console.log('A');
  setTimeout(() => console.log('B'), 0);
  Promise.resolve().then(() => console.log('C'));
  console.log('D');
}

function enigme3() {
  // Ma prédiction : ...
  async function charger() {
    console.log('B');
    await null;
    console.log('D');
  }
  console.log('A');
  charger();
  console.log('C');
}

function enigme4() {
  // Ma prédiction : ...
  console.log('A');
  setTimeout(() => console.log('E'), 0);
  Promise.resolve()
    .then(() => console.log('C'))
    .then(() => console.log('D'));
  console.log('B');
}

function enigme5() {
  // Ma prédiction : B s'affiche après combien de millisecondes ? ...
  const debut = Date.now();
  setTimeout(() => console.log('B, après', Date.now() - debut, 'ms'), 100);
  while (Date.now() - debut < 1000) {
    // on occupe la pile pendant une seconde
  }
  console.log('A, après', Date.now() - debut, 'ms');
}

// Lancement depuis Node.js : node 03-ordre.js 2
if (typeof process !== 'undefined' && process.argv) {
  const numero = process.argv[2] ?? '1';
  const enigmes = { 1: enigme1, 2: enigme2, 3: enigme3, 4: enigme4, 5: enigme5 };
  if (enigmes[numero]) enigmes[numero]();
  else console.log('Usage : node 03-ordre.js <numéro de 1 à 5>');
}

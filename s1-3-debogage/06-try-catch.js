// Exercice BUG.6 : le filet troué (10 minutes)
// Lancer : node 06-try-catch.js 1   puis   node 06-try-catch.js 2
// (Dans le navigateur : collez une fonction dans la console, puis appelez-la.)
//
// Dans les deux cas, le développeur a pourtant écrit un try ... catch.

function cas1() {
  try {
    setTimeout(() => {
      JSON.parse('pas du JSON'); // lève une SyntaxError
    }, 1000);
  } catch (e) {
    console.log('Attrapée :', e.message);
  }
  console.log('Fin du try : aucune erreur pour l\'instant');
}

function chargerProfil() {
  // Imite un fetch qui échoue : la promesse est rompue au bout de 500 ms.
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Réseau indisponible')), 500);
  });
}

function cas2() {
  try {
    chargerProfil().then((profil) => console.log('Profil :', profil));
  } catch (e) {
    console.log('Attrapée :', e.message);
  }
  console.log('Fin du try : aucune erreur pour l\'instant');
}

// 1. Lancez le cas 1. Le message « Attrapée » s'affiche-t-il ? Quel mot de l'erreur
//    le confirme ?
// 2. Dessinez la pile au moment où le try s'exécute, puis au moment où JSON.parse
//    s'exécute. Le bloc try est-il encore sur la pile ?
// 3. Corrigez le cas 1 : où faut-il placer le try ... catch ?
// 4. Lancez le cas 2. Quel message voyez-vous ? (Node.js arrête même le programme.)
// 5. Corrigez le cas 2 de deux façons : avec .catch(...), puis avec une fonction
//    async et await DANS le try. Pourquoi la version avec await fonctionne-t-elle ?

if (typeof process !== 'undefined' && process.argv) {
  const numero = process.argv[2] ?? '1';
  if (numero === '1') cas1();
  else if (numero === '2') cas2();
  else console.log('Usage : node 06-try-catch.js <1 ou 2>');
}

// Exercice AS.4 : prédire l'ordre
//
// Quatre énigmes. Chacune est une fonction qui reçoit `log` (qui joue le rôle de console.log).
// Pour chacune, ÉCRIVEZ dans PREDICTIONS la liste des lettres, dans l'ordre où elles seront affichées.
//
// Faites-le d'abord DE TÊTE, en dessinant la pile, la file des microtâches et la file des tâches.
// Ensuite seulement, vérifiez : le test dit si votre prédiction est juste, sans donner la réponse.
//
// Vérifier : node --test async/04-predire.test.js

export const ENIGMES = {
  1: (log) => {
    log('A');
    setTimeout(() => log('B'), 0);
    Promise.resolve().then(() => log('C'));
    log('D');
  },
  2: (log) => {
    (async () => {
      log('1');
      await null;
      log('3');
    })();
    log('2');
  },
  3: (log) => {
    Promise.resolve().then(() => log('A'));
    setTimeout(() => log('B'), 0);
    (async () => {
      log('C');
      await null;
      log('D');
    })();
    log('E');
  },
  4: (log) => {
    Promise.resolve().then(() => {
      log('a');
      Promise.resolve().then(() => log('b'));
    });
    setTimeout(() => log('t'), 0);
    Promise.resolve().then(() => log('c'));
    log('s');
  },
};

// À remplir : par exemple 1: ['A', 'B', 'C', 'D']
export const PREDICTIONS = {
  1: [],
  2: [],
  3: [],
  4: [],
};

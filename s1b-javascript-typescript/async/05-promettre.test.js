import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promettre } from './05-promettre.js';

// Fonctions « à la Node » : le rappel (erreur, valeur) est le dernier argument.
function additionner(a, b, rappel) {
  setTimeout(() => rappel(null, a + b), 5);
}
function lireOffre(id, rappel) {
  setTimeout(() => (id === 'o-1' ? rappel(null, { id, title: 'PFE' }) : rappel(new Error(`Offre ${id} introuvable`))), 5);
}
function sansArgument(rappel) {
  setTimeout(() => rappel(null, 'fini'), 5);
}

test('promettre renvoie une fonction qui renvoie une promesse', () => {
  const additionnerPromesse = promettre(additionner);
  assert.equal(typeof additionnerPromesse, 'function');
  assert.equal(additionnerPromesse(1, 2) instanceof Promise, true);
});

test('la promesse est tenue avec la valeur du rappel', async () => {
  assert.equal(await promettre(additionner)(2, 3), 5);
  assert.deepEqual(await promettre(lireOffre)('o-1'), { id: 'o-1', title: 'PFE' });
});

test('la promesse est rompue avec l\'erreur du rappel', async () => {
  await assert.rejects(() => promettre(lireOffre)('o-9'), { message: 'Offre o-9 introuvable' });
});

test('une fonction sans autre argument que le rappel', async () => {
  assert.equal(await promettre(sansArgument)(), 'fini');
});

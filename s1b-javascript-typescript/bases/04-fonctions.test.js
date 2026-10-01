import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formaterPrix, somme, creerCompteur } from './04-fonctions.js';

test('formaterPrix avec et sans devise', () => {
  assert.equal(formaterPrix(3000), '3000 MAD');
  assert.equal(formaterPrix(3000, 'EUR'), '3000 EUR');
});

test('somme accepte un nombre quelconque d\'arguments', () => {
  assert.equal(somme(1, 2, 3), 6);
  assert.equal(somme(5), 5);
  assert.equal(somme(), 0);
  assert.equal(somme(10, -4, 1.5), 7.5);
});

test('creerCompteur renvoie une fonction qui compte', () => {
  const compter = creerCompteur();
  assert.equal(typeof compter, 'function');
  assert.equal(compter(), 1);
  assert.equal(compter(), 2);
  assert.equal(compter(), 3);
});

test('deux compteurs sont indépendants (fermeture)', () => {
  const a = creerCompteur();
  const b = creerCompteur();
  a();
  a();
  assert.equal(b(), 1);
  assert.equal(a(), 3);
});

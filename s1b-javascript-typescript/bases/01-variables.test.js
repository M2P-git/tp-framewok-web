import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decrire } from './01-variables.js';

test('les types simples', () => {
  assert.equal(decrire(3000), 'nombre');
  assert.equal(decrire(2.5), 'nombre');
  assert.equal(decrire(NaN), 'nombre');
  assert.equal(decrire('Rabat'), 'texte');
  assert.equal(decrire(true), 'booléen');
  assert.equal(decrire(undefined), 'indéfini');
});

test('null n\'est pas un objet', () => {
  assert.equal(decrire(null), 'nul');
});

test('un tableau n\'est pas un simple objet', () => {
  assert.equal(decrire([1, 2]), 'tableau');
  assert.equal(decrire([]), 'tableau');
});

test('les objets et les fonctions', () => {
  assert.equal(decrire({ a: 1 }), 'objet');
  assert.equal(decrire(new Date()), 'objet');
  assert.equal(decrire(() => 1), 'fonction');
  assert.equal(decrire(function () {}), 'fonction');
});

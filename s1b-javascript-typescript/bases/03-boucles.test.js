import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OFFRES } from '../donnees-offres.js';
import { sommeGratifications, premiereOffreDe, compterParVille } from './03-boucles.js';

test('sommeGratifications', () => {
  assert.equal(sommeGratifications(OFFRES), 13000);
  assert.equal(sommeGratifications([]), 0);
});

test('premiereOffreDe renvoie la première offre de la ville', () => {
  assert.equal(premiereOffreDe('Rabat', OFFRES).id, 'o-0004');
  assert.equal(premiereOffreDe('Casablanca', OFFRES).id, 'o-0001');
});

test('premiereOffreDe renvoie undefined quand rien ne correspond', () => {
  assert.equal(premiereOffreDe('Fès', OFFRES).id, 'o-0006'); // et bien une offre quand il y en a une
  assert.equal(premiereOffreDe('Tanger', OFFRES), undefined);
  assert.equal(premiereOffreDe('Rabat', []), undefined);
});

test('compterParVille', () => {
  assert.deepEqual(compterParVille(OFFRES), { Casablanca: 3, Rabat: 2, Fès: 1 });
  assert.deepEqual(compterParVille([]), {});
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { libelleMode, etiquetteDelai, libelleGratification } from './02-conditions.js';

test('libelleMode', () => {
  assert.equal(libelleMode('onsite'), 'Sur site');
  assert.equal(libelleMode('hybrid'), 'Hybride');
  assert.equal(libelleMode('remote'), 'Télétravail');
  assert.equal(libelleMode('autre'), 'Inconnu');
  assert.equal(libelleMode(undefined), 'Inconnu');
});

test('etiquetteDelai : les quatre cas', () => {
  assert.equal(etiquetteDelai(-5), 'clôturée');
  assert.equal(etiquetteDelai(-1), 'clôturée');
  assert.equal(etiquetteDelai(0), 'dernier jour');
  assert.equal(etiquetteDelai(1), 'bientôt');
  assert.equal(etiquetteDelai(3), 'bientôt');
  assert.equal(etiquetteDelai(4), 'ouverte');
  assert.equal(etiquetteDelai(30), 'ouverte');
});

test('libelleGratification', () => {
  assert.equal(libelleGratification(0), 'non rémunéré');
  assert.equal(libelleGratification(3000), '3000 MAD par mois');
  assert.equal(libelleGratification(2500), '2500 MAD par mois');
});

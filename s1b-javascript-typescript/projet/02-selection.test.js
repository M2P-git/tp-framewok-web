import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRESTATIONS } from '../donnees-mawid.js';
import { basculer, estSelectionnee, prestationsChoisies, retirerIndisponibles } from './02-selection.js';

const gele = (liste) => Object.freeze([...liste]);
const prestations = Object.freeze(PRESTATIONS.map((p) => Object.freeze({ ...p })));

test('basculer ajoute à la fin, sans modifier l\'original', () => {
  const avant = gele(['sv-001']);
  const apres = basculer(avant, 'sv-002');
  assert.deepEqual(apres, ['sv-001', 'sv-002']);
  assert.deepEqual(avant, ['sv-001']);
  assert.notEqual(apres, avant, 'il faut une NOUVELLE liste');
});

test('basculer retire un identifiant déjà présent', () => {
  assert.deepEqual(basculer(gele(['sv-001', 'sv-002', 'sv-004']), 'sv-002'), ['sv-001', 'sv-004']);
  assert.deepEqual(basculer(gele(['sv-001']), 'sv-001'), []);
});

test('estSelectionnee', () => {
  assert.equal(estSelectionnee(gele(['sv-001', 'sv-004']), 'sv-004'), true);
  assert.equal(estSelectionnee(gele(['sv-001']), 'sv-004'), false);
  assert.equal(estSelectionnee(gele([]), 'sv-001'), false);
});

test('prestationsChoisies, dans l\'ordre de la sélection', () => {
  const choisies = prestationsChoisies(prestations, gele(['sv-004', 'sv-001', 'sv-999']));
  assert.deepEqual(choisies.map((p) => p.id), ['sv-004', 'sv-001']);
  assert.equal(choisies[0].name, 'Coloration racines');
});

test('retirerIndisponibles', () => {
  const avant = gele(['sv-008', 'sv-001', 'sv-999', 'sv-007']);
  assert.deepEqual(retirerIndisponibles(avant, prestations), ['sv-001', 'sv-007']);
  assert.deepEqual(avant, ['sv-008', 'sv-001', 'sv-999', 'sv-007']);
});

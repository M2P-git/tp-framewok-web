import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRESTATIONS } from '../donnees-mawid.js';
import { normaliser, filtrerPrestations, grouperParGroupe, trierPrestations, prixAPartirDe } from './03-catalogue.js';

const prestations = Object.freeze(PRESTATIONS.map((p) => Object.freeze({ ...p })));
const ids = (liste) => liste.map((p) => p.id);

test('normaliser', () => {
  assert.equal(normaliser('Mèches ou Balayage'), 'meches ou balayage');
  assert.equal(normaliser('SALÉ'), 'sale');
});

test('filtrerPrestations : seulement les actives', () => {
  assert.deepEqual(ids(filtrerPrestations(prestations, { q: '', groupe: '' })),
    ['sv-001', 'sv-002', 'sv-003', 'sv-004', 'sv-005', 'sv-006', 'sv-007']);
});

test('filtrerPrestations : recherche sans majuscules ni accents', () => {
  assert.deepEqual(ids(filtrerPrestations(prestations, { q: 'COUPE', groupe: '' })), ['sv-001', 'sv-002']);
  assert.deepEqual(ids(filtrerPrestations(prestations, { q: 'meches', groupe: '' })), ['sv-005']);
  assert.deepEqual(ids(filtrerPrestations(prestations, { q: 'soin', groupe: '' })), ['sv-006'],
    'le soin à la kératine est inactif');
});

test('filtrerPrestations : par groupe, et les deux filtres ensemble', () => {
  assert.deepEqual(ids(filtrerPrestations(prestations, { q: '', groupe: 'Soins' })), ['sv-006', 'sv-007']);
  assert.deepEqual(ids(filtrerPrestations(prestations, { q: 'homme', groupe: 'Coupe' })), ['sv-002']);
  assert.deepEqual(filtrerPrestations(prestations, { q: 'zzz', groupe: '' }), []);
});

test('grouperParGroupe', () => {
  const groupes = grouperParGroupe(filtrerPrestations(prestations, { q: '', groupe: '' }));
  assert.deepEqual(groupes.map((g) => g.groupe), ['Coupe', 'Couleur', 'Soins']);
  assert.deepEqual(ids(groupes[0].prestations), ['sv-001', 'sv-002', 'sv-003']);
  assert.deepEqual(ids(groupes[2].prestations), ['sv-006', 'sv-007']);
  assert.deepEqual(grouperParGroupe([]), []);
});

test('trierPrestations, sans modifier l\'original', () => {
  assert.deepEqual(ids(trierPrestations(prestations, 'prix')),
    ['sv-007', 'sv-002', 'sv-003', 'sv-001', 'sv-006', 'sv-004', 'sv-008', 'sv-005']);
  assert.deepEqual(ids(trierPrestations(prestations, 'duree')),
    ['sv-007', 'sv-002', 'sv-003', 'sv-006', 'sv-001', 'sv-008', 'sv-004', 'sv-005']);
  assert.deepEqual(ids(trierPrestations(prestations, 'nom')),
    ['sv-003', 'sv-004', 'sv-001', 'sv-002', 'sv-007', 'sv-005', 'sv-008', 'sv-006']);
  assert.deepEqual(ids(prestations), ['sv-001', 'sv-002', 'sv-003', 'sv-004', 'sv-005', 'sv-006', 'sv-007', 'sv-008']);
});

test('prixAPartirDe : 0 est une vraie réponse', () => {
  assert.equal(prixAPartirDe(prestations), 0);
  assert.equal(prixAPartirDe(prestations.filter((p) => p.id !== 'sv-007')), 80);
  assert.equal(prixAPartirDe(prestations.filter((p) => p.id === 'sv-008')), null, 'sv-008 est inactive');
  assert.equal(prixAPartirDe([]), null);
});

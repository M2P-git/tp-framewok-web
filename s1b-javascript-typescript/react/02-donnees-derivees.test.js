import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OFFRES } from '../donnees-offres.js';
import { filtrerOffres, villesDisponibles, page } from './02-donnees-derivees.js';

const offres = Object.freeze([...OFFRES]);
const ids = (liste) => liste.map((o) => o.id);

test('sans filtre, on garde tout, dans l\'ordre', () => {
  assert.deepEqual(ids(filtrerOffres(offres, { q: '', city: '', workMode: '' })), ids(OFFRES));
});

test('filtre par ville', () => {
  assert.deepEqual(ids(filtrerOffres(offres, { q: '', city: 'Rabat', workMode: '' })), ['o-0004', 'o-0005']);
});

test('filtre par mode de travail', () => {
  assert.deepEqual(ids(filtrerOffres(offres, { q: '', city: '', workMode: 'remote' })), ['o-0003', 'o-0006']);
});

test('recherche dans le titre ou l\'entreprise, sans tenir compte des majuscules', () => {
  assert.deepEqual(ids(filtrerOffres(offres, { q: 'TICKETS', city: '', workMode: '' })), ['o-0004']);
  assert.deepEqual(ids(filtrerOffres(offres, { q: 'labs', city: '', workMode: '' })), ['o-0005', 'o-0006']);
});

test('les filtres se combinent', () => {
  assert.deepEqual(ids(filtrerOffres(offres, { q: 'gestion', city: 'Rabat', workMode: 'hybrid' })), ['o-0005']);
  assert.deepEqual(filtrerOffres(offres, { q: 'zzz', city: '', workMode: '' }), []);
});

test('villesDisponibles : sans doublon, en ordre alphabétique français', () => {
  assert.deepEqual(villesDisponibles(offres), ['Casablanca', 'Fès', 'Rabat']);
});

test('page', () => {
  assert.deepEqual(ids(page(offres, 1, 4)), ['o-0001', 'o-0002', 'o-0003', 'o-0004']);
  assert.deepEqual(ids(page(offres, 2, 4)), ['o-0005', 'o-0006']);
  assert.deepEqual(page(offres, 3, 4), []);
});

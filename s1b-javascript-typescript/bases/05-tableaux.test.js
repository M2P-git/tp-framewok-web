import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OFFRES } from '../donnees-offres.js';
import { villesDistinctes, titresDe, offreLaMieuxPayee, trierParGratification } from './05-tableaux.js';

// Un tableau gelé : toute tentative de le modifier (push, sort, splice...) lève une erreur.
const gelees = Object.freeze([...OFFRES]);

test('villesDistinctes', () => {
  assert.deepEqual(villesDistinctes(gelees), ['Casablanca', 'Rabat', 'Fès']);
  assert.deepEqual(villesDistinctes([]), []);
});

test('titresDe', () => {
  assert.deepEqual(titresDe('Rabat', gelees), [
    'PFE : outil interne de gestion des tickets',
    'PFE : portail de gestion des stages',
  ]);
  assert.deepEqual(titresDe('Tanger', gelees), []);
});

test('offreLaMieuxPayee', () => {
  assert.equal(offreLaMieuxPayee(gelees).stipendMad, 4000);
  assert.equal(offreLaMieuxPayee(gelees).id, 'o-0002'); // la première des deux à 4000
  assert.equal(offreLaMieuxPayee([]), undefined);
});

test('trierParGratification trie sans modifier le tableau reçu', () => {
  const triees = trierParGratification(gelees);
  assert.deepEqual(triees.map((o) => o.stipendMad), [4000, 4000, 3000, 2000, 0, 0]);
  assert.notEqual(triees, gelees);
  assert.equal(gelees[0].id, 'o-0001'); // l'original garde son ordre
});

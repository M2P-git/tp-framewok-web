import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sansLeChamp, fusionner, inverser } from './06-objets.js';

test('sansLeChamp retire un champ sans modifier l\'original', () => {
  const offre = Object.freeze({ id: 'o-1', city: 'Rabat', description: 'long texte' });
  const resultat = sansLeChamp(offre, 'description');
  assert.deepEqual(resultat, { id: 'o-1', city: 'Rabat' });
  assert.equal('description' in offre, true);
  assert.notEqual(resultat, offre);
});

test('sansLeChamp avec un champ absent', () => {
  assert.deepEqual(sansLeChamp({ a: 1 }, 'z'), { a: 1 });
});

test('fusionner : le second objet l\'emporte', () => {
  const a = Object.freeze({ city: 'Rabat', page: 3 });
  const b = Object.freeze({ city: 'Fès', q: 'react' });
  assert.deepEqual(fusionner(a, b), { city: 'Fès', page: 3, q: 'react' });
  assert.deepEqual(a, { city: 'Rabat', page: 3 });
});

test('inverser', () => {
  assert.deepEqual(inverser({ a: 1, b: 2 }), { 1: 'a', 2: 'b' });
  assert.deepEqual(inverser({}), {});
});

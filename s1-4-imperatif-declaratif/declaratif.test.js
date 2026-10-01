import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { villes, totalGratifications, aUnFavori } from './declaratif.js';

const offres = [
  { id: 'o-1', city: 'Rabat', stipendMad: 3000 },
  { id: 'o-2', city: 'Casablanca', stipendMad: 3500 },
  { id: 'o-3', city: 'Rabat', stipendMad: 2500 },
  { id: 'o-4', city: 'Tanger', stipendMad: 0 },
];

test('villes : sans doublon, dans l\'ordre d\'apparition', () => {
  assert.deepEqual(villes(offres), ['Rabat', 'Casablanca', 'Tanger']);
  assert.deepEqual(villes([]), []);
});

test('villes : ne modifie pas le tableau d\'origine', () => {
  const copie = structuredClone(offres);
  villes(offres);
  assert.deepEqual(offres, copie);
});

test('totalGratifications', () => {
  assert.equal(totalGratifications(offres), 9000);
  assert.equal(totalGratifications([]), 0);
});

test('aUnFavori', () => {
  assert.equal(aUnFavori(offres, new Set(['o-3'])), true);
  assert.equal(aUnFavori(offres, new Set(['o-9'])), false);
  assert.equal(aUnFavori(offres, new Set()), false);
  assert.equal(aUnFavori([], new Set(['o-1'])), false);
});

test('le style est déclaratif : ni for, ni while, ni let', () => {
  const source = readFileSync(new URL('./declaratif.js', import.meta.url), 'utf8')
    .split('\n')
    .filter((ligne) => !ligne.trim().startsWith('//'))
    .join('\n');
  assert.doesNotMatch(source, /\bfor\s*\(/, 'une boucle for est restée');
  assert.doesNotMatch(source, /\bwhile\s*\(/, 'une boucle while est restée');
  assert.doesNotMatch(source, /\blet\s/, 'une variable let est restée');
});

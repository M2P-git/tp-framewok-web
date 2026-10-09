import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { groupes, totalPrix, aUneChoisie } from './declaratif.js';

const prestations = [
  { id: 'sv-1', group: 'Coupe', priceMad: 135 },
  { id: 'sv-2', group: 'Couleur', priceMad: 250 },
  { id: 'sv-3', group: 'Coupe', priceMad: 70 },
  { id: 'sv-4', group: 'Soins', priceMad: 0 },
];

test("groupes : sans doublon, dans l'ordre d'apparition", () => {
  assert.deepEqual(groupes(prestations), ['Coupe', 'Couleur', 'Soins']);
  assert.deepEqual(groupes([]), []);
});

test("groupes : ne modifie pas le tableau d'origine", () => {
  const copie = structuredClone(prestations);
  groupes(prestations);
  assert.deepEqual(prestations, copie);
});

test('totalPrix', () => {
  assert.equal(totalPrix(prestations), 455);
  assert.equal(totalPrix([]), 0);
});

test('aUneChoisie', () => {
  assert.equal(aUneChoisie(prestations, new Set(['sv-3'])), true);
  assert.equal(aUneChoisie(prestations, new Set(['sv-9'])), false);
  assert.equal(aUneChoisie(prestations, new Set()), false);
  assert.equal(aUneChoisie([], new Set(['sv-1'])), false);
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

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { premier, dernier, grouperPar } from './04-generiques.ts';

test('premier et dernier', () => {
  assert.equal(premier([1, 2, 3]), 1);
  assert.equal(dernier([1, 2, 3]), 3);
  assert.equal(premier([]), undefined);
  assert.equal(dernier([]), undefined);
});

test('grouperPar', () => {
  const offres = [
    { id: 'o-1', city: 'Rabat' },
    { id: 'o-2', city: 'Fès' },
    { id: 'o-3', city: 'Rabat' },
  ];
  assert.deepEqual(grouperPar(offres, (o) => o.city), {
    Rabat: [offres[0], offres[2]],
    Fès: [offres[1]],
  });
  assert.deepEqual(grouperPar([], (x: string) => x), {});
});

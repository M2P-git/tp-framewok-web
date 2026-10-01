import { test } from 'node:test';
import assert from 'node:assert/strict';
import { debounce } from './02-debounce.js';

const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('rien ne se passe avant le délai', async () => {
  const appels = [];
  const f = debounce((x) => appels.push(x), 60);
  f('a');
  await attendre(20);
  assert.deepEqual(appels, [], 'la fonction ne doit pas être appelée tout de suite');
  await attendre(100);
  assert.deepEqual(appels, ['a']);
});

test('une rafale d\'appels ne donne qu\'un seul appel, avec le dernier argument', async () => {
  const appels = [];
  const f = debounce((x) => appels.push(x), 60);
  f('r');
  await attendre(20);
  f('re');
  await attendre(20);
  f('rea');
  await attendre(150);
  assert.deepEqual(appels, ['rea']);
});

test('deux rafales séparées donnent deux appels', async () => {
  const appels = [];
  const f = debounce((x) => appels.push(x), 40);
  f(1);
  await attendre(120);
  f(2);
  await attendre(120);
  assert.deepEqual(appels, [1, 2]);
});

test('chaque debounce a son propre minuteur', async () => {
  const a = [];
  const b = [];
  const fa = debounce((x) => a.push(x), 40);
  const fb = debounce((x) => b.push(x), 40);
  fa('a');
  fb('b');
  await attendre(120);
  assert.deepEqual([a, b], [['a'], ['b']]);
});

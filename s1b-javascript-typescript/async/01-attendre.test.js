import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attendre, avecDelai, avecTimeout } from './01-attendre.js';

test('attendre renvoie une promesse qui se tient après le délai', async () => {
  const p = attendre(40);
  assert.equal(p instanceof Promise, true);
  const debut = Date.now();
  const valeur = await p;
  assert.equal(valeur, undefined);
  assert.ok(Date.now() - debut >= 30, 'la promesse s\'est tenue trop tôt');
});

test('avecDelai donne la valeur', async () => {
  assert.equal(await avecDelai('ok', 10), 'ok');
  assert.deepEqual(await avecDelai({ id: 'o-1' }, 10), { id: 'o-1' });
});

test('avecTimeout laisse passer une promesse assez rapide', async () => {
  assert.equal(await avecTimeout(avecDelai('rapide', 10), 200), 'rapide');
});

test('avecTimeout rompt une promesse trop lente', async () => {
  await assert.rejects(() => avecTimeout(avecDelai('lent', 150), 20), { message: 'Délai dépassé' });
});

test('avecTimeout transmet l\'erreur de la promesse', async () => {
  const echec = Promise.reject(new Error('serveur en panne'));
  await assert.rejects(() => avecTimeout(echec, 200), { message: 'serveur en panne' });
});

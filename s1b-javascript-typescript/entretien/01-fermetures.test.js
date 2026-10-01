import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once, memoiser } from './01-fermetures.js';

test('once n\'appelle la fonction qu\'une fois', () => {
  let appels = 0;
  const initialiser = once((x) => {
    appels += 1;
    return x * 2;
  });
  assert.equal(initialiser(21), 42);
  assert.equal(initialiser(100), 42, 'les appels suivants renvoient le résultat du premier');
  assert.equal(initialiser(), 42);
  assert.equal(appels, 1);
});

test('chaque once a sa propre mémoire', () => {
  const a = once(() => 'a');
  const b = once(() => 'b');
  assert.equal(a(), 'a');
  assert.equal(b(), 'b');
});

test('once garde aussi un résultat « faux »', () => {
  let appels = 0;
  const zero = once(() => {
    appels += 1;
    return 0;
  });
  zero();
  zero();
  assert.equal(appels, 1);
});

test('memoiser ne recalcule pas pour les mêmes arguments', () => {
  let appels = 0;
  const carre = memoiser((n) => {
    appels += 1;
    return n * n;
  });
  assert.equal(carre(4), 16);
  assert.equal(carre(4), 16);
  assert.equal(carre(5), 25);
  assert.equal(carre(4), 16);
  assert.equal(appels, 2);
});

test('memoiser distingue les arguments', () => {
  let appels = 0;
  const additionner = memoiser((a, b) => {
    appels += 1;
    return a + b;
  });
  assert.equal(additionner(1, 2), 3);
  assert.equal(additionner(2, 1), 3);
  assert.equal(additionner(1, 2), 3);
  assert.equal(appels, 2);
});

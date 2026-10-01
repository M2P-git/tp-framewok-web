import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aplatir, decouper, estPalindrome } from './03-recursion.js';

test('aplatir à toute profondeur', () => {
  assert.deepEqual(aplatir([1, [2, [3, [4]]], 5]), [1, 2, 3, 4, 5]);
  assert.deepEqual(aplatir([]), []);
  assert.deepEqual(aplatir([[], [[]], [1]]), [1]);
  assert.deepEqual(aplatir(['a', ['b', ['c']]]), ['a', 'b', 'c']);
});

test('aplatir ne modifie pas l\'original', () => {
  const original = Object.freeze([1, Object.freeze([2, 3])]);
  assert.deepEqual(aplatir(original), [1, 2, 3]);
  assert.deepEqual(original, [1, [2, 3]]);
});

test('decouper', () => {
  assert.deepEqual(decouper([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(decouper([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
  assert.deepEqual(decouper([1, 2], 5), [[1, 2]]);
  assert.deepEqual(decouper([], 3), []);
});

test('estPalindrome', () => {
  assert.equal(estPalindrome('radar'), true);
  assert.equal(estPalindrome('Esope reste ici et se repose'), true);
  assert.equal(estPalindrome('A man, a plan, a canal: Panama'), true);
  assert.equal(estPalindrome('bonjour'), false);
  assert.equal(estPalindrome(''), true);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import resume, { DEVISE, formaterPrix } from './05-modules.js';
import * as module from './05-modules.js';

test('export nommé DEVISE', () => {
  assert.equal(DEVISE, 'MAD');
});

test('export nommé formaterPrix', () => {
  assert.equal(formaterPrix(3000), '3000 MAD');
  assert.equal(formaterPrix(0), '0 MAD');
});

test('export par défaut : resume', () => {
  assert.equal(typeof resume, 'function');
  assert.equal(resume({ title: 'PFE : API', stipendMad: 3000 }), 'PFE : API (3000 MAD)');
});

test('le module exporte bien ces trois éléments', () => {
  assert.deepEqual(Object.keys(module).sort(), ['DEVISE', 'default', 'formaterPrix']);
});

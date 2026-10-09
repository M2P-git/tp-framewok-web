import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRESTATIONS } from '../donnees-mawid.js';
import { formaterPrix, formaterDuree, totalSelection, resumeSelection } from './01-prix.js';

const p = (id) => PRESTATIONS.find((x) => x.id === id);

test('formaterPrix', () => {
  assert.equal(formaterPrix(150), '150 DH');
  assert.equal(formaterPrix(80), '80 DH');
  assert.equal(formaterPrix(0), 'Offert', '0 dirham : la prestation est offerte');
  assert.equal(formaterPrix(1500), `${(1500).toLocaleString('fr-FR')} DH`);
});

test('formaterDuree', () => {
  assert.equal(formaterDuree(45), '45 min');
  assert.equal(formaterDuree(0), '0 min');
  assert.equal(formaterDuree(60), '1 h');
  assert.equal(formaterDuree(90), '1 h 30');
  assert.equal(formaterDuree(65), '1 h 05', 'les minutes s\'écrivent sur deux chiffres');
  assert.equal(formaterDuree(135), '2 h 15');
  assert.equal(formaterDuree(120), '2 h');
});

test('totalSelection', () => {
  assert.deepEqual(totalSelection([]), { prix: 0, duree: 0 });
  assert.deepEqual(totalSelection([p('sv-001')]), { prix: 150, duree: 45 });
  assert.deepEqual(totalSelection([p('sv-001'), p('sv-002'), p('sv-007')]), { prix: 230, duree: 90 });
});

test('resumeSelection', () => {
  assert.equal(resumeSelection([]), '');
  assert.equal(resumeSelection([p('sv-001')]), '1 prestation · 150 DH · 45 min');
  assert.equal(resumeSelection([p('sv-001'), p('sv-002')]), '2 prestations · 230 DH · 1 h 15');
  assert.equal(resumeSelection([p('sv-007')]), '1 prestation · Offert · 15 min');
});

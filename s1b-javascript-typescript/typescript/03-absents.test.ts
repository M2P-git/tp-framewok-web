import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nbCompetences, nomEntreprise, titreOuDefaut, longueur } from './03-absents.ts';

const avec = { id: 'o-1', title: 'PFE : API', skills: ['React', 'Docker'], company: { name: 'Draa Labs' } };
const sans = { id: 'o-2', title: 'PFE : mobile' };

test('nbCompetences', () => {
  assert.equal(nbCompetences(avec), 2);
  assert.equal(nbCompetences(sans), 0);
});

test('nomEntreprise', () => {
  assert.equal(nomEntreprise(avec), 'Draa Labs');
  assert.equal(nomEntreprise(sans), 'inconnue');
});

test('titreOuDefaut', () => {
  assert.equal(titreOuDefaut([avec, sans], 'o-2'), 'PFE : mobile');
  assert.equal(titreOuDefaut([avec, sans], 'o-9'), 'introuvable');
  assert.equal(titreOuDefaut([], 'o-1'), 'introuvable');
});

test('longueur', () => {
  assert.equal(longueur('Rabat'), 5);
  assert.equal(longueur(''), 0);
  assert.equal(longueur(null), 0);
});

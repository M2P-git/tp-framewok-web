import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resumeOffre, initiales, slugifier } from './07-chaines.js';

test('resumeOffre', () => {
  const offre = { title: 'PFE : API de paiement', city: 'Rabat', stipendMad: 3000 };
  assert.equal(resumeOffre(offre), 'PFE : API de paiement · Rabat · 3000 MAD');
});

test('initiales', () => {
  assert.equal(initiales('Othmane Ziani'), 'OZ');
  assert.equal(initiales('nour'), 'N');
  assert.equal(initiales('Sara El Amrani'), 'SEA');
});

test('slugifier', () => {
  assert.equal(slugifier('PFE : Moteur de recherche'), 'pfe-moteur-de-recherche');
  assert.equal(slugifier('  Éléphant à Fès !  '), 'elephant-a-fes');
  assert.equal(slugifier('API REST / GraphQL'), 'api-rest-graphql');
  assert.equal(slugifier('déjà-vu'), 'deja-vu');
});

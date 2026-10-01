import { test } from 'node:test';
import assert from 'node:assert/strict';
import { texteEtat, etiquetteGratification, nomEntreprise } from './03-rendu-conditionnel.js';

test('texteEtat : chargement, erreur, vide, plein', () => {
  assert.equal(texteEtat({ chargement: true, erreur: null, offres: [] }), 'Chargement…');
  assert.equal(texteEtat({ chargement: false, erreur: 'Panne du serveur', offres: [] }), 'Erreur : Panne du serveur');
  assert.equal(texteEtat({ chargement: false, erreur: null, offres: [] }), 'Aucune offre');
  assert.equal(texteEtat({ chargement: false, erreur: null, offres: [{ id: 'o-1' }] }), '1 offre');
  assert.equal(texteEtat({ chargement: false, erreur: null, offres: [{}, {}, {}] }), '3 offres');
});

test('texteEtat : l\'ordre des cas', () => {
  assert.equal(texteEtat({ chargement: true, erreur: 'x', offres: [{}] }), 'Chargement…');
  assert.equal(texteEtat({ chargement: false, erreur: 'x', offres: [{}] }), 'Erreur : x');
});

test('etiquetteGratification : 0 est une vraie valeur', () => {
  assert.equal(etiquetteGratification({ stipendMad: 3000 }), '3000 MAD');
  assert.equal(etiquetteGratification({ stipendMad: 0 }), 'non rémunéré');
  assert.equal(etiquetteGratification({}), 'non précisée');
  assert.equal(etiquetteGratification({ stipendMad: null }), 'non précisée');
});

test('nomEntreprise', () => {
  assert.equal(nomEntreprise({ company: { name: 'Draa Labs' } }), 'Draa Labs');
  assert.equal(nomEntreprise({}), 'entreprise inconnue');
  assert.equal(nomEntreprise({ company: null }), 'entreprise inconnue');
});

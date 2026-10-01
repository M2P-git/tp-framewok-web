import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ajouterFavori, retirerFavori, basculerFavori, mettreAJourOffre } from './01-immutabilite.js';

const favoris = Object.freeze(['o-1', 'o-2']);

test('ajouterFavori renvoie un nouveau tableau', () => {
  const resultat = ajouterFavori(favoris, 'o-3');
  assert.deepEqual(resultat, ['o-1', 'o-2', 'o-3']);
  assert.notEqual(resultat, favoris);
  assert.deepEqual(favoris, ['o-1', 'o-2']);
});

test('ajouterFavori n\'ajoute pas deux fois le même id', () => {
  assert.deepEqual(ajouterFavori(favoris, 'o-1'), ['o-1', 'o-2']);
});

test('retirerFavori', () => {
  assert.deepEqual(retirerFavori(favoris, 'o-1'), ['o-2']);
  assert.deepEqual(retirerFavori(favoris, 'o-9'), ['o-1', 'o-2']);
  assert.deepEqual(favoris, ['o-1', 'o-2']);
});

test('basculerFavori', () => {
  assert.deepEqual(basculerFavori(favoris, 'o-1'), ['o-2']);
  assert.deepEqual(basculerFavori(favoris, 'o-3'), ['o-1', 'o-2', 'o-3']);
});

test('mettreAJourOffre remplace seulement l\'offre visée', () => {
  const offres = Object.freeze([
    Object.freeze({ id: 'o-1', city: 'Rabat', stipendMad: 0 }),
    Object.freeze({ id: 'o-2', city: 'Fès', stipendMad: 3000 }),
  ]);
  const resultat = mettreAJourOffre(offres, 'o-1', { stipendMad: 2000 });
  assert.deepEqual(resultat, [
    { id: 'o-1', city: 'Rabat', stipendMad: 2000 },
    { id: 'o-2', city: 'Fès', stipendMad: 3000 },
  ]);
  assert.notEqual(resultat, offres, 'il faut un nouveau tableau');
  assert.notEqual(resultat[0], offres[0], 'l\'offre modifiée doit être un nouvel objet');
  assert.equal(resultat[1], offres[1], 'les autres offres doivent rester les mêmes objets (même adresse)');
  assert.equal(offres[0].stipendMad, 0, 'l\'original ne doit pas changer');
});

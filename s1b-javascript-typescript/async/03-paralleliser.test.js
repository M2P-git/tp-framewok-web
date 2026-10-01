import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chargerEnParallele, chargerSansEchec } from './03-paralleliser.js';

const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Chaque requête dure 50 ms ; « o-x » échoue.
const api = {
  async offre(id) {
    await attendre(50);
    if (id === 'o-x') throw new Error(`Offre ${id} introuvable`);
    return { id, title: `Offre ${id}` };
  },
};

test('chargerEnParallele renvoie les offres dans l\'ordre', async () => {
  const offres = await chargerEnParallele(['o-3', 'o-1', 'o-2'], api);
  assert.deepEqual(offres.map((o) => o.id), ['o-3', 'o-1', 'o-2']);
});

test('chargerEnParallele lance les requêtes en même temps', async () => {
  const debut = Date.now();
  const offres = await chargerEnParallele(['o-1', 'o-2', 'o-3', 'o-4', 'o-5'], api);
  const duree = Date.now() - debut;
  assert.equal(offres.length, 5, 'les cinq offres doivent être chargées');
  // Une par une : 5 x 50 = 250 ms. Ensemble : environ 50 ms.
  assert.ok(duree < 160, `trop lent (${duree} ms) : les requêtes partent-elles en même temps ?`);
});

test('chargerEnParallele transmet l\'erreur', async () => {
  await assert.rejects(() => chargerEnParallele(['o-1', 'o-x', 'o-2'], api), { message: 'Offre o-x introuvable' });
});

test('chargerSansEchec garde les réussites et liste les échecs', async () => {
  const resultat = await chargerSansEchec(['o-1', 'o-x', 'o-2', 'o-y'], {
    async offre(id) {
      await attendre(30);
      if (id === 'o-x' || id === 'o-y') throw new Error('panne');
      return { id };
    },
  });
  assert.deepEqual(resultat, { reussies: [{ id: 'o-1' }, { id: 'o-2' }], echecs: ['o-x', 'o-y'] });
});

test('chargerSansEchec lance aussi tout en même temps', async () => {
  const debut = Date.now();
  const resultat = await chargerSansEchec(['o-1', 'o-2', 'o-3', 'o-4', 'o-5'], api);
  assert.equal(resultat.reussies.length, 5, 'les cinq offres doivent être chargées');
  assert.ok(Date.now() - debut < 160, 'les requêtes doivent partir en même temps');
});

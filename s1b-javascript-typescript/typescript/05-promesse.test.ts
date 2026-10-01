import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estOffre, chargerOffre } from './05-promesse.ts';

const valide = { id: 'o-1', title: 'PFE : API', city: 'Rabat', stipendMad: 3000 };
const reponse = (ok: boolean, status: number, corps: unknown) => async () => ({ ok, status, json: async () => corps });

test('estOffre accepte une offre complète', () => {
  assert.equal(estOffre(valide), true);
});

test('estOffre refuse ce qui n\'est pas une offre', () => {
  assert.equal(estOffre(null), false);
  assert.equal(estOffre(undefined), false);
  assert.equal(estOffre('texte'), false);
  assert.equal(estOffre(42), false);
  assert.equal(estOffre({}), false);
  assert.equal(estOffre({ ...valide, stipendMad: '3000' }), false);
  assert.equal(estOffre({ id: 'o-1', title: 'PFE', city: 'Rabat' }), false);
});

test('chargerOffre renvoie l\'offre', async () => {
  const offre = await chargerOffre('o-1', reponse(true, 200, valide));
  assert.deepEqual(offre, valide);
});

test('chargerOffre demande la bonne adresse', async () => {
  let demandee = '';
  await chargerOffre('o-7', async (url) => {
    demandee = url;
    return { ok: true, status: 200, json: async () => valide };
  });
  assert.equal(demandee, '/api/offers/o-7');
});

test('chargerOffre lève une erreur si la réponse n\'est pas ok', async () => {
  await assert.rejects(() => chargerOffre('o-9', reponse(false, 404, { message: 'x' })), {
    message: 'Offre introuvable (404)',
  });
});

test('chargerOffre lève une erreur si le JSON n\'est pas une offre', async () => {
  await assert.rejects(() => chargerOffre('o-1', reponse(true, 200, { id: 'o-1' })), {
    message: 'Réponse invalide',
  });
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SALON } from '../donnees-mawid.js';
import { chargerPageSalon, avecDelaiMax, reessayer, reserver } from './06-asynchrone.js';

const attendre = (ms, valeur) => new Promise((resolve) => setTimeout(() => resolve(valeur), ms));
const echouer = (ms, erreur) => new Promise((_, reject) => setTimeout(() => reject(erreur), ms));
const AVIS = [{ id: 'rv-1', rating: 5 }];

test('chargerPageSalon lance les deux requêtes en même temps', async () => {
  const api = {
    getEtablissement: (slug) => attendre(80, { ...SALON, slug }),
    getAvis: () => attendre(80, AVIS),
  };
  const debut = Date.now();
  const page = await chargerPageSalon('salon-yasmine-rabat', api);
  const duree = Date.now() - debut;
  assert.equal(page.etablissement.name, 'Salon Yasmine');
  assert.deepEqual(page.avis, AVIS);
  assert.ok(duree < 140, `${duree} ms : les deux requêtes ont été faites l'une après l'autre`);
});

test('chargerPageSalon échoue si une requête échoue', async () => {
  const api = {
    getEtablissement: () => attendre(10, SALON),
    getAvis: () => echouer(10, new Error('Panne simulée')),
  };
  await assert.rejects(chargerPageSalon('salon-yasmine-rabat', api), { message: 'Panne simulée' });
});

test('avecDelaiMax : à temps, ou trop tard', async () => {
  assert.equal(await avecDelaiMax(attendre(10, 'ok'), 200), 'ok');
  await assert.rejects(avecDelaiMax(attendre(300, 'trop tard'), 30), { message: 'Délai dépassé' });
  await assert.rejects(avecDelaiMax(echouer(10, new Error('404')), 200), { message: '404' });
});

test('reessayer : réussit au troisième essai', async () => {
  let appels = 0;
  const instable = async () => {
    appels += 1;
    if (appels < 3) throw new Error(`échec ${appels}`);
    return 'enfin';
  };
  assert.equal(await reessayer(instable, 3), 'enfin');
  assert.equal(appels, 3);
});

test('reessayer : relance la dernière erreur', async () => {
  let appels = 0;
  const enPanne = async () => {
    appels += 1;
    throw new Error(`échec ${appels}`);
  };
  await assert.rejects(reessayer(enPanne, 2), { message: 'échec 2' });
  assert.equal(appels, 2);
});

test('reserver : succès, créneau pris, formulaire refusé, panne', async () => {
  const erreurHttp = (status, erreurs) => Object.assign(new Error(`HTTP ${status}`), { status, erreurs });
  const demande = { businessId: 'b-01', serviceIds: ['sv-001'], date: '2026-10-07', time: '11:00' };

  const ok = await reserver({ creerRendezVous: async (d) => ({ id: 'bk-100', ...d, status: 'pending' }) }, demande);
  assert.deepEqual(ok, { ok: true, rendezVous: { id: 'bk-100', ...demande, status: 'pending' } });

  const pris = await reserver({ creerRendezVous: async () => { throw erreurHttp(409); } }, demande);
  assert.deepEqual(pris, { ok: false, raison: 'creneau-pris' });

  const invalide = await reserver({ creerRendezVous: async () => { throw erreurHttp(422, { consent: 'Obligatoire' }); } }, demande);
  assert.deepEqual(invalide, { ok: false, raison: 'invalide', erreurs: { consent: 'Obligatoire' } });

  await assert.rejects(reserver({ creerRendezVous: async () => { throw erreurHttp(500); } }, demande), { message: 'HTTP 500' });
});

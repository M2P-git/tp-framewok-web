import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RENDEZ_VOUS } from '../donnees-mawid.js';
import { rendezVousDuJour, peutPasser, changerStatut, statistiques } from './05-agenda.js';

const rdvs = Object.freeze(RENDEZ_VOUS.map((r) => Object.freeze({ ...r })));
const ids = (liste) => liste.map((r) => r.id);

test('rendezVousDuJour, triés par heure', () => {
  assert.deepEqual(ids(rendezVousDuJour(rdvs, '2026-10-06')), ['bk-001', 'bk-002', 'bk-003', 'bk-004', 'bk-005']);
  assert.deepEqual(ids(rendezVousDuJour(rdvs, '2026-10-07')), ['bk-007', 'bk-008', 'bk-006']);
  assert.deepEqual(rendezVousDuJour(rdvs, '2026-10-08'), []);
  assert.equal(rdvs[5].id, 'bk-006', 'la liste d\'origine ne change pas');
});

test('peutPasser', () => {
  assert.equal(peutPasser('pending', 'confirmed'), true);
  assert.equal(peutPasser('confirmed', 'no_show'), true);
  assert.equal(peutPasser('pending', 'completed'), false, 'on confirme avant d\'honorer');
  assert.equal(peutPasser('cancelled', 'confirmed'), false);
});

test('changerStatut renvoie un nouvel objet', () => {
  const avant = rdvs.find((r) => r.id === 'bk-007');
  const apres = changerStatut(avant, 'confirmed', '2026-10-05T09:00');
  assert.equal(apres.status, 'confirmed');
  assert.equal(apres.updatedAt, '2026-10-05T09:00');
  assert.equal(apres.id, 'bk-007');
  assert.equal(apres.priceMad, 80, 'les autres champs sont gardés');
  assert.equal(avant.status, 'pending', 'l\'original ne change pas');
  assert.notEqual(apres, avant);
});

test('changerStatut refuse une transition interdite', () => {
  const honore = rdvs.find((r) => r.id === 'bk-001');
  assert.throws(() => changerStatut(honore, 'cancelled', '2026-10-06T18:00'),
    { message: 'Impossible de passer de « completed » à « cancelled »' });
});

test('statistiques', () => {
  assert.deepEqual(statistiques(rdvs), {
    total: 8,
    parStatut: { pending: 1, confirmed: 2, completed: 3, cancelled: 1, no_show: 1 },
    chiffreAffaires: 700,
    tauxAbsence: 0.25,
  });
  assert.deepEqual(statistiques([]), {
    total: 0,
    parStatut: { pending: 0, confirmed: 0, completed: 0, cancelled: 0, no_show: 0 },
    chiffreAffaires: 0,
    tauxAbsence: 0,
  });
});

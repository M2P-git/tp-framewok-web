import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as attendre } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const port = 3101;
const base = `http://127.0.0.1:${port}/api`;
let serveur;
before(async () => {
  serveur = spawn(process.execPath, [fileURLToPath(new URL('./serveur.mjs', import.meta.url))], {
    env: { ...process.env, PORT: String(port), LATENCE: '0', PANNE: '0', AUJOURDHUI: '2026-10-06' }, stdio: 'ignore', windowsHide: true,
  });
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(`${base}/meta`)).ok) return; } catch {}
    await attendre(100);
  }
  throw new Error('L’API de test ne démarre pas');
});
after(() => serveur?.kill());
const json = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
test('annuaire, recherche sans accents, pagination et établissement complet', async () => {
  const page = await (await fetch(`${base}/businesses?limit=5&page=2`)).json();
  assert.equal(page.items.length, 5); assert.equal(page.page, 2); assert.ok(page.total >= 30);
  const recherche = await (await fetch(`${base}/businesses?q=sale`)).json();
  assert.ok(recherche.items.some((b) => b.city === 'Salé'));
  const salon = await (await fetch(`${base}/businesses/salon-yasmine-rabat`)).json();
  assert.ok(salon.services.length); assert.ok(salon.staff.length); assert.ok(salon.theme.primary);
});
test('une date impossible produit 422, jamais une panne 500', async () => {
  for (const date of ['2026-99-99', '2026-02-30', 'pas-une-date']) {
    assert.equal((await fetch(`${base}/businesses/b-06/availability?date=${date}&serviceIds=sv-049`)).status, 422);
  }
});
test('validation par champ, deux réservations concurrentes et machine à états', async () => {
  const invalide = await fetch(`${base}/bookings`, json('POST', {}));
  assert.equal(invalide.status, 422);
  assert.ok((await invalide.json()).errors.consent);
  const salon = await (await fetch(`${base}/businesses/salon-yasmine-rabat`)).json();
  const service = salon.services[0];
  const staff = salon.staff.find((s) => s.serviceIds.includes(service.id));
  let choix;
  for (let jour = 7; jour <= 13; jour++) {
    const date = `2026-10-${String(jour).padStart(2, '0')}`;
    const dispo = await (await fetch(`${base}/businesses/${salon.id}/availability?date=${date}&serviceIds=${service.id}&staffId=${staff.id}`)).json();
    if (dispo.slots.length) { choix = { date, time: dispo.slots[0].time }; break; }
  }
  assert.ok(choix, 'un créneau de démo doit être disponible');
  const corps = { businessId: salon.id, serviceIds: [service.id], staffId: staff.id, ...choix, customer: { firstName: 'Client', lastName: 'Recette', phone: '0611111111' }, consent: true };
  const reponses = await Promise.all([fetch(`${base}/bookings`, json('POST', corps)), fetch(`${base}/bookings`, json('POST', corps))]);
  assert.deepEqual(reponses.map((r) => r.status).sort(), [201, 409]);
  const rdv = await reponses.find((r) => r.status === 201).json();
  assert.equal(rdv.priceMad, service.priceMad); assert.equal(rdv.staffId, staff.id);
  const agenda = await (await fetch(`${base}/businesses/${salon.id}/bookings?date=${choix.date}`)).json();
  assert.ok(agenda.some((r) => r.id === rdv.id));
  if (rdv.status === 'pending') assert.equal((await fetch(`${base}/bookings/${rdv.id}`, json('PATCH', { status: 'confirmed', by: 'business' }))).status, 200);
  assert.equal((await fetch(`${base}/bookings/${rdv.id}`, json('PATCH', { status: 'completed', by: 'business' }))).status, 422);
  assert.equal((await fetch(`${base}/bookings/${rdv.id}`, json('PATCH', { status: 'cancelled', by: 'business' }))).status, 200);
  assert.equal((await fetch(`${base}/bookings/${rdv.id}`, json('PATCH', { status: 'confirmed', by: 'business' }))).status, 422);
});
test('connexion simulée et panne déclenchée à la demande', async () => {
  assert.equal((await fetch(`${base}/auth/login`, json('POST', { email: 'salon-yasmine-rabat@pro.mawid.test', password: 'demo1234' }))).status, 200);
  assert.equal((await fetch(`${base}/auth/login`, json('POST', { email: 'inconnu', password: 'incorrect' }))).status, 401);
  assert.equal((await fetch(`${base}/businesses?_panne=1`)).status, 500);
  assert.equal((await fetch(`${base}/businesses/inconnu`)).status, 404);
});

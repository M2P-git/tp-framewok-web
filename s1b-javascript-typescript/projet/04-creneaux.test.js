import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SALON, RENDEZ_VOUS } from '../donnees-mawid.js';
import { enMinutes, enHeure, seChevauchent, genererCreneaux, creneauxLibres, jourDeLaSemaine } from './04-creneaux.js';

test('enMinutes et enHeure', () => {
  assert.equal(enMinutes('09:30'), 570);
  assert.equal(enMinutes('00:00'), 0);
  assert.equal(enMinutes('20:00'), 1200);
  assert.equal(enHeure(570), '09:30');
  assert.equal(enHeure(605), '10:05');
  assert.equal(enHeure(0), '00:00');
});

test('seChevauchent', () => {
  assert.equal(seChevauchent({ debut: 600, fin: 645 }, { debut: 630, fin: 660 }), true);
  assert.equal(seChevauchent({ debut: 630, fin: 660 }, { debut: 600, fin: 645 }), true);
  assert.equal(seChevauchent({ debut: 600, fin: 700 }, { debut: 620, fin: 640 }), true, 'l\'un contient l\'autre');
  assert.equal(seChevauchent({ debut: 600, fin: 645 }, { debut: 645, fin: 675 }), false, 'ils se touchent seulement');
  assert.equal(seChevauchent({ debut: 600, fin: 630 }, { debut: 700, fin: 730 }), false);
});

test('genererCreneaux', () => {
  assert.deepEqual(genererCreneaux([['10:00', '11:00'], ['14:00', '15:00']], 45, 15), ['10:00', '10:15', '14:00', '14:15']);
  assert.deepEqual(genererCreneaux([['10:00', '10:30']], 45, 15), [], 'la prestation ne tient pas dans la plage');
  assert.deepEqual(genererCreneaux([], 30, 15), [], 'jour de fermeture');
  assert.equal(genererCreneaux(SALON.openingHours.tue, 30, 15).length, 11 + 23);
});

test('creneauxLibres', () => {
  // L'agenda de st-001 le mardi 6 octobre, le matin : 10:00-10:45 et 11:00-11:30
  const occupes = RENDEZ_VOUS
    .filter((r) => r.staffId === 'st-001' && r.start.startsWith('2026-10-06') && r.status !== 'cancelled')
    .map((r) => ({ debut: r.start.slice(11), fin: r.end.slice(11) }));
  assert.deepEqual(creneauxLibres([['10:00', '12:00']], occupes, 30, 15), ['11:30']);
  assert.deepEqual(creneauxLibres([['10:00', '12:00']], occupes, 15, 15), ['10:45', '11:30', '11:45']);
  assert.deepEqual(creneauxLibres([['10:00', '12:00']], [], 60, 30), ['10:00', '10:30', '11:00']);
});

test('jourDeLaSemaine', () => {
  assert.equal(jourDeLaSemaine('2026-10-06'), 'tue');
  assert.equal(jourDeLaSemaine('2026-10-04'), 'sun');
  assert.equal(jourDeLaSemaine('2027-01-01'), 'fri');
  assert.deepEqual(SALON.openingHours[jourDeLaSemaine('2026-10-05')], [], 'le salon est fermé le lundi');
});

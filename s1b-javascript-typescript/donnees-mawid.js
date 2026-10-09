// Un petit extrait de Mawid, écrit à la main pour les exercices de la série P.
// Les vraies données (donnees/db.json, à la racine du dépôt) ont exactement la même forme.

export const SALON = {
  id: 'b-01',
  slug: 'salon-yasmine-rabat',
  name: 'Salon Yasmine',
  city: 'Rabat',
  openingHours: {
    mon: [],
    tue: [['10:00', '13:00'], ['14:00', '20:00']],
    wed: [['10:00', '13:00'], ['14:00', '20:00']],
    thu: [['10:00', '13:00'], ['14:00', '20:00']],
    fri: [['10:00', '12:30'], ['14:30', '20:00']],
    sat: [['09:30', '20:00']],
    sun: [['10:00', '14:00']],
  },
  settings: { slotStepMinutes: 15, minNoticeMinutes: 60, maxDaysAhead: 30, freeCancellationHours: 24, autoConfirm: false },
};

export const PRESTATIONS = [
  { id: 'sv-001', group: 'Coupe', name: 'Coupe femme', durationMinutes: 45, priceMad: 150, active: true },
  { id: 'sv-002', group: 'Coupe', name: 'Coupe homme', durationMinutes: 30, priceMad: 80, active: true },
  { id: 'sv-003', group: 'Coupe', name: 'Brushing', durationMinutes: 30, priceMad: 100, active: true },
  { id: 'sv-004', group: 'Couleur', name: 'Coloration racines', durationMinutes: 60, priceMad: 250, active: true },
  { id: 'sv-005', group: 'Couleur', name: 'Mèches ou balayage', durationMinutes: 120, priceMad: 600, active: true },
  { id: 'sv-006', group: 'Soins', name: "Soin hydratant à l'huile d'argan", durationMinutes: 30, priceMad: 150, active: true },
  { id: 'sv-007', group: 'Soins', name: 'Diagnostic capillaire', durationMinutes: 15, priceMad: 0, active: true },
  { id: 'sv-008', group: 'Soins', name: 'Soin à la kératine', durationMinutes: 45, priceMad: 300, active: false },
];

export const RENDEZ_VOUS = [
  { id: 'bk-001', serviceIds: ['sv-001'], staffId: 'st-001', start: '2026-10-06T10:00', end: '2026-10-06T10:45', priceMad: 150, status: 'completed' },
  { id: 'bk-002', serviceIds: ['sv-004'], staffId: 'st-002', start: '2026-10-06T10:30', end: '2026-10-06T11:30', priceMad: 250, status: 'completed' },
  { id: 'bk-003', serviceIds: ['sv-002'], staffId: 'st-001', start: '2026-10-06T11:00', end: '2026-10-06T11:30', priceMad: 80, status: 'no_show' },
  { id: 'bk-004', serviceIds: ['sv-001', 'sv-006'], staffId: 'st-001', start: '2026-10-06T14:00', end: '2026-10-06T15:15', priceMad: 300, status: 'completed' },
  { id: 'bk-005', serviceIds: ['sv-003'], staffId: 'st-002', start: '2026-10-06T16:00', end: '2026-10-06T16:30', priceMad: 100, status: 'cancelled' },
  { id: 'bk-006', serviceIds: ['sv-005'], staffId: 'st-002', start: '2026-10-07T14:00', end: '2026-10-07T16:00', priceMad: 600, status: 'confirmed' },
  { id: 'bk-007', serviceIds: ['sv-002'], staffId: 'st-001', start: '2026-10-07T10:00', end: '2026-10-07T10:30', priceMad: 80, status: 'pending' },
  { id: 'bk-008', serviceIds: ['sv-007'], staffId: 'st-001', start: '2026-10-07T10:30', end: '2026-10-07T10:45', priceMad: 0, status: 'confirmed' },
];

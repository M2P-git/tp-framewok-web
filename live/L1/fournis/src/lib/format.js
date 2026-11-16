// Afficher un prix et une durée (fonctions fournies : on les utilise, on ne les réécrit pas).

// formaterPrix(135) donne « 135 DH » ; formaterPrix(0) donne « Offert »
export function formaterPrix(prix) {
  if (prix === 0) return 'Offert';
  return `${prix} DH`;
}

// formaterDuree(45) donne « 45 min » ; formaterDuree(90) donne « 1 h 30 »
export function formaterDuree(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const heures = Math.floor(minutes / 60);
  const reste = minutes % 60;
  if (reste === 0) return `${heures} h`;
  return `${heures} h ${String(reste).padStart(2, '0')}`;
}

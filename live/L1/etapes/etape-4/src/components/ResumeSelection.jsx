// Résumé de la sélection, par exemple « 2 prestations · 385 DH · 1 h 45 ».
// Aucune valeur n'est stockée : tout est calculé à partir des prestations reçues.
import { formaterDuree, formaterPrix } from '../lib/format.js';

export default function ResumeSelection({ services, onEffacer }) {
  // Sélection vide : message d'invitation
  if (services.length === 0) {
    return <p className="etat">Choisissez une ou plusieurs prestations.</p>;
  }

  // reduce : somme des prix, puis des durées
  const prix = services.reduce((somme, service) => somme + service.priceMad, 0);
  const duree = services.reduce((somme, service) => somme + service.durationMinutes, 0);
  const nombre = services.length > 1 ? `${services.length} prestations` : '1 prestation';

  return (
    <aside className="resume-selection">
      <strong>{nombre} · {formaterPrix(prix)} · {formaterDuree(duree)}</strong>
      <button type="button" onClick={onEffacer}>Tout effacer</button>
    </aside>
  );
}

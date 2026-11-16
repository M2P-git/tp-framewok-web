// Le résumé de la sélection : « 2 prestations · 385 DH · 1 h 45 ».
// Rien n'est stocké ici : tout se CALCULE à partir des prestations choisies, à chaque affichage.
import { formaterDuree, formaterPrix } from '../lib/format.js';

export default function ResumeSelection({ services, onEffacer }) {
  // Rien de choisi : on n'affiche qu'une invitation
  if (services.length === 0) {
    return <p className="etat">Choisissez une ou plusieurs prestations.</p>;
  }

  // reduce : toute la liste devient UNE valeur (la somme des prix, puis des durées)
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

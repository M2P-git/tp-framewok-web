// Carte d'une prestation : affiche les données reçues par les props.
import { formaterDuree, formaterPrix } from '../lib/format.js';

export default function CarteService({ service }) {
  return (
    <article className="carte">
      <h3>{service.name}</h3>
      <p className="discret">{formaterDuree(service.durationMinutes)}</p>
      <p className="prix">{formaterPrix(service.priceMad)}</p>
      <button type="button">+ Ajouter</button>
    </article>
  );
}

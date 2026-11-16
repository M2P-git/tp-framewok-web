// La carte d'une prestation : elle affiche ce qu'on lui donne.
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

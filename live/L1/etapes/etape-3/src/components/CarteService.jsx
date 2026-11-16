// La carte d'une prestation : elle affiche ce qu'on lui donne, et PRÉVIENT son parent au clic.
// Elle ne garde aucun état : c'est App qui sait ce qui est choisi.
import { formaterDuree, formaterPrix } from '../lib/format.js';

export default function CarteService({ service, choisie, onBasculer }) {
  return (
    <article className={choisie ? 'carte choisie' : 'carte'}>
      <h3>{service.name}</h3>
      <p className="discret">{formaterDuree(service.durationMinutes)}</p>
      <p className="prix">{formaterPrix(service.priceMad)}</p>
      <button type="button" onClick={onBasculer}>
        {choisie ? '✓ Ajoutée' : '+ Ajouter'}
      </button>
    </article>
  );
}

// Carte d'une prestation : affiche les props reçues et signale le clic au parent.
// La carte ne possède pas d'état : la sélection est conservée dans App.
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

// La liste des prestations : une carte par prestation, grâce à map.
// Elle transmet à chaque carte : est-elle choisie ? que faire au clic ?
import CarteService from './CarteService.jsx';

export default function ListeServices({ services, selection, onBasculer }) {
  return (
    <section className="grille">
      {services.map((service) => (
        // key : une étiquette unique et stable, venue des données (l'id), pour que React s'y retrouve
        <CarteService
          key={service.id}
          service={service}
          choisie={selection.includes(service.id)}
          onBasculer={() => onBasculer(service.id)}
        />
      ))}
    </section>
  );
}

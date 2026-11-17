// Liste des prestations : une carte par élément du tableau.
// Transmet à chaque carte son état de sélection et la fonction à appeler au clic.
import CarteService from './CarteService.jsx';

export default function ListeServices({ services, selection, onBasculer }) {
  return (
    <section className="grille">
      {services.map((service) => (
        // key : identifiant unique et stable, issu des données
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

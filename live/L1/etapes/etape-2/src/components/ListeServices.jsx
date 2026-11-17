// Liste des prestations : une carte par élément du tableau.
import CarteService from './CarteService.jsx';

export default function ListeServices({ services }) {
  return (
    <section className="grille">
      {services.map((service) => (
        // key : identifiant unique et stable, issu des données
        <CarteService key={service.id} service={service} />
      ))}
    </section>
  );
}

// La liste des prestations : une carte par prestation, grâce à map.
import CarteService from './CarteService.jsx';

export default function ListeServices({ services }) {
  return (
    <section className="grille">
      {services.map((service) => (
        // key : une étiquette unique et stable, venue des données (l'id), pour que React s'y retrouve
        <CarteService key={service.id} service={service} />
      ))}
    </section>
  );
}

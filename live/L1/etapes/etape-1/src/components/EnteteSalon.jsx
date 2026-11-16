// L'en-tête d'un salon : un composant qui reçoit le salon par ses props.
// Tout vient des données : le même composant sert pour n'importe quel salon.
export default function EnteteSalon({ salon }) {
  // Déstructurer : sortir d'un coup les valeurs dont on a besoin
  const { name, district, city, tagline, rating, theme } = salon;

  return (
    <header className="entete-salon">
      <div className="logo">{theme.logoText}</div>
      <div>
        <h1>{name}</h1>
        <p className="accroche">{district}, {city} · {tagline}</p>
      </div>
      <p className="note">★ {rating.average} <span className="discret">({rating.count} avis)</span></p>
    </header>
  );
}

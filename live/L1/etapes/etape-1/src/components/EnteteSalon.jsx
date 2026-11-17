// En-tête d'un salon : le salon est reçu par les props.
// Les valeurs affichées proviennent toutes des props.
export default function EnteteSalon({ salon }) {
  // Déstructuration des propriétés utilisées
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

// src/App.jsx : la page d'un salon. C'est ICI qu'on travaille pendant la séance L1.
import { SALONS } from './donnees/salons.js';
import { themeVersStyle } from './lib/theme.js';
import EnteteSalon from './components/EnteteSalon.jsx';
import ListeServices from './components/ListeServices.jsx';

export default function App() {
  // Le salon affiché : le premier du tableau, le Salon Yasmine
  const salon = SALONS[0];

  return (
    // style={...} pose les couleurs du salon sur toute la page (voir src/lib/theme.js)
    <div className="app" style={themeVersStyle(salon.theme)}>
      <EnteteSalon salon={salon} />
      <h2>Les prestations</h2>
      <ListeServices services={salon.services} />
    </div>
  );
}

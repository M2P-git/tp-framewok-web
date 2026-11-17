// src/App.jsx : page d'un salon (séance L1).
import { SALONS } from './donnees/salons.js';
import { themeVersStyle } from './lib/theme.js';
import EnteteSalon from './components/EnteteSalon.jsx';

export default function App() {
  // Salon affiché : premier élément du tableau (Salon Yasmine)
  const salon = SALONS[0];

  return (
    // style : variables CSS du thème du salon (voir src/lib/theme.js)
    <div className="app" style={themeVersStyle(salon.theme)}>
      <EnteteSalon salon={salon} />
    </div>
  );
}

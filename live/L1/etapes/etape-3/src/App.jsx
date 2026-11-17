// src/App.jsx : page d'un salon (séance L1).
import { useState } from 'react';
import { SALONS } from './donnees/salons.js';
import { themeVersStyle } from './lib/theme.js';
import EnteteSalon from './components/EnteteSalon.jsx';
import ListeServices from './components/ListeServices.jsx';

export default function App() {
  // Salon affiché : premier élément du tableau (Salon Yasmine)
  const salon = SALONS[0];

  // État : identifiants des prestations choisies (aucune au départ)
  const [selection, setSelection] = useState([]);

  // Ajout ou retrait d'un identifiant : l'état est remplacé par un nouveau tableau
  function basculer(id) {
    if (selection.includes(id)) {
      setSelection(selection.filter((x) => x !== id));
    } else {
      setSelection([...selection, id]);
    }
  }

  return (
    // style : variables CSS du thème du salon (voir src/lib/theme.js)
    <div className="app" style={themeVersStyle(salon.theme)}>
      <EnteteSalon salon={salon} />
      <h2>Les prestations</h2>
      <ListeServices services={salon.services} selection={selection} onBasculer={basculer} />
    </div>
  );
}

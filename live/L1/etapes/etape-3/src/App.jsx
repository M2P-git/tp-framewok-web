// src/App.jsx : la page d'un salon. C'est ICI qu'on travaille pendant la séance L1.
import { useState } from 'react';
import { SALONS } from './donnees/salons.js';
import { themeVersStyle } from './lib/theme.js';
import EnteteSalon from './components/EnteteSalon.jsx';
import ListeServices from './components/ListeServices.jsx';

export default function App() {
  // Le salon affiché : le premier du tableau, le Salon Yasmine
  const salon = SALONS[0];

  // L'état : la liste des id choisis. Au départ, rien n'est choisi.
  const [selection, setSelection] = useState([]);

  // Ajouter ou retirer une prestation : on donne à React une NOUVELLE liste, jamais la même modifiée
  function basculer(id) {
    if (selection.includes(id)) {
      setSelection(selection.filter((x) => x !== id));
    } else {
      setSelection([...selection, id]);
    }
  }

  return (
    // style={...} pose les couleurs du salon sur toute la page (voir src/lib/theme.js)
    <div className="app" style={themeVersStyle(salon.theme)}>
      <EnteteSalon salon={salon} />
      <h2>Les prestations</h2>
      <ListeServices services={salon.services} selection={selection} onBasculer={basculer} />
    </div>
  );
}

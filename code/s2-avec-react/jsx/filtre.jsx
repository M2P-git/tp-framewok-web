// src/App.jsx : le catalogue avec filtre (notions 12, 13)
import { useState } from 'react';
import './App.css';

// Les données : un objet par prestation
const PRESTATIONS = [
  { id: 'sv-001', group: 'Coupe',
    name: 'Coupe femme', priceMad: 135 },
  { id: 'sv-002', group: 'Coupe',
    name: 'Coupe homme', priceMad: 70 },
  { id: 'sv-005', group: 'Couleur',
    name: 'Coloration racines', priceMad: 250 },
];

// Le total se calcule à partir de la sélection
function calculerTotal(selection) {
  let somme = 0;
  for (const prestation of PRESTATIONS) {
    if (selection.includes(prestation.id)) {
      somme = somme + prestation.priceMad;
    }
  }
  return somme;
}

// La carte affiche ce qu'on lui donne, et prévient au clic
function CarteService({ nom, prix, choisie, onBasculer }) {
  const classe = choisie ? 'carte choisie' : 'carte';
  return (
    <article className={classe}>
      <h3>{nom}</h3>
      <p>{prix} DH</p>
      <button onClick={onBasculer}>
        {choisie ? '✓ Ajoutée' : '+ Ajouter'}
      </button>
    </article>
  );
}

function Catalogue() {
  const [selection, setSelection] = useState([]);
  const [filtre, setFiltre] = useState('');

  // Tout le reste se calcule à chaque affichage
  const visibles = PRESTATIONS.filter((prestation) =>
    filtre === '' || prestation.group === filtre);
  const total = calculerTotal(selection);

  // On remplace la sélection par une nouvelle liste
  function basculer(id) {
    if (selection.includes(id)) {
      setSelection(selection.filter((x) => x !== id));
    } else {
      setSelection([...selection, id]);
    }
  }

  return (
    <>
      <h1>Salon Yasmine</h1>
      <label>
        Catégorie{' '}
        <select id="categorie" value={filtre}
          onChange={(e) => setFiltre(e.target.value)}>
          <option value="">Toutes</option>
          <option>Coupe</option>
          <option>Couleur</option>
        </select>
      </label>
      <p>Total : {total} DH</p>
      <main>
        {visibles.map((prestation) => (
          <CarteService
            key={prestation.id}
            nom={prestation.name}
            prix={prestation.priceMad}
            choisie={selection.includes(prestation.id)}
            onBasculer={() => basculer(prestation.id)}
          />
        ))}
      </main>
    </>
  );
}

export default function App() {
  return <Catalogue />;
}

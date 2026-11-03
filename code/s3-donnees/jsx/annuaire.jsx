// src/App.jsx : les établissements d'une ville (notion 6)
// L'API doit tourner : node api-simulee/serveur.mjs (dépôt des TP)
import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:3001/api';
const VILLES = ['Rabat', 'Casablanca', 'Marrakech', 'Fès'];

export default function App() {
  const [ville, setVille] = useState('Rabat');
  const [etablissements, setEtablissements] = useState([]);

  // Relancé au premier affichage, puis à chaque changement de ville
  useEffect(() => {
    async function charger() {
      const reponse = await fetch(API + '/businesses?city=' + ville);
      const page = await reponse.json();
      setEtablissements(page.items);
    }
    charger();
  }, [ville]);

  return (
    <>
      <label>
        Ville{' '}
        <select value={ville} onChange={(e) => setVille(e.target.value)}>
          {VILLES.map((nom) => (
            <option key={nom}>{nom}</option>
          ))}
        </select>
      </label>
      <p>{etablissements.length} établissements</p>
      <ul>
        {etablissements.map((etablissement) => (
          <li key={etablissement.id}>{etablissement.name}</li>
        ))}
      </ul>
    </>
  );
}

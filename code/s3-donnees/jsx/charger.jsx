// src/App.jsx : les prestations viennent du serveur (notion 4)
// L'API doit tourner : node api-simulee/serveur.mjs (dépôt des TP)
import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:3001/api';
const ADRESSE = API + '/businesses/salon-yasmine-rabat/services';

function CarteService({ nom, prix }) {
  return (
    <article className="carte">
      <h3>{nom}</h3>
      <p>{prix} DH</p>
    </article>
  );
}

export default function App() {
  // 1. Au premier affichage : aucune prestation
  const [prestations, setPrestations] = useState([]);

  // 2. Juste après l'affichage, une seule fois : demander au serveur
  useEffect(() => {
    async function charger() {
      const reponse = await fetch(ADRESSE);
      const donnees = await reponse.json();
      // 3. Ranger la réponse dans l'état : React affiche de nouveau
      setPrestations(donnees);
    }
    charger();
  }, []);

  return (
    <main>
      {prestations.map((prestation) => (
        <CarteService
          key={prestation.id}
          nom={prestation.name}
          prix={prestation.priceMad}
        />
      ))}
    </main>
  );
}

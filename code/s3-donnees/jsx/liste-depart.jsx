// src/App.jsx : le point de départ de l'exercice 4
// Les prestations sont écrites dans le code, comme en S2 : faites-les venir du serveur.
import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:3001/api';
const ADRESSE = API + '/businesses/salon-yasmine-rabat/services';

const PRESTATIONS = [
  { id: 'sv-001', name: 'Coupe femme', priceMad: 135 },
  { id: 'sv-002', name: 'Coupe homme', priceMad: 70 },
  { id: 'sv-004', name: 'Brushing', priceMad: 110 },
];

function CarteService({ nom, prix }) {
  return (
    <article className="carte">
      <h3>{nom}</h3>
      <p>{prix} DH</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      {PRESTATIONS.map((prestation) => (
        <CarteService
          key={prestation.id}
          nom={prestation.name}
          prix={prestation.priceMad}
        />
      ))}
    </main>
  );
}

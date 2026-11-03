// src/App.jsx : les deux compteurs du QCM 10
import { useState } from 'react';
import './App.css';

// Une variable ordinaire : elle change (voir la console,
// F12), mais React n'est pas prévenu : l'écran reste à 0
function CompteurCasse() {
  let nombre = 0;
  return (
    <button onClick={() => {
      nombre = nombre + 1;
      console.log('nombre vaut', nombre);
    }}>
      Cliqué {nombre} fois
    </button>
  );
}

// L'état : React garde la valeur et redessine
function Compteur() {
  const [nombre, setNombre] = useState(0);
  return (
    <button onClick={() => setNombre(nombre + 1)}>
      Cliqué {nombre} fois
    </button>
  );
}

export default function App() {
  return (
    <>
      <h2>Avec une variable ordinaire</h2>
      <CompteurCasse />
      <h2>Avec l'état</h2>
      <Compteur />
    </>
  );
}

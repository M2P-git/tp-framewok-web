// src/App.jsx : la carte de la notion 4
import { useState } from 'react';
import './App.css';

function CarteCoupe() {
  const [choisie, setChoisie] = useState(false);
  const classe = choisie ? 'carte choisie' : 'carte';
  return (
    <>
      <article className={classe}>
        <h3>Coupe femme</h3>
        <p>45 min · 135 DH</p>
        <button onClick={() => setChoisie(!choisie)}>
          {choisie ? '✓ Ajoutée' : '+ Ajouter'}
        </button>
      </article>
      <p>Total : {choisie ? 135 : 0} DH</p>
    </>
  );
}

export default function App() {
  return <CarteCoupe />;
}

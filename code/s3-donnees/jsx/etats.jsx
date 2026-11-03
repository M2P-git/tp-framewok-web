// src/App.jsx : les états d'un écran qui charge (notion 5)
// L'API doit tourner : node api-simulee/serveur.mjs (dépôt des TP)
import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:3001/api';
// Pour voir l'erreur : ajoutez ?_panne=1 après services
// (le serveur répond alors 500)
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
  const [prestations, setPrestations] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    async function charger() {
      try {
        const reponse = await fetch(ADRESSE);
        if (reponse.ok) {
          setPrestations(await reponse.json());
        } else {
          setErreur('Erreur ' + reponse.status + ' : réessayez plus tard.');
        }
      } catch {
        setErreur('Le serveur ne répond pas.');
      }
      setChargement(false);
    }
    charger();
  }, []);

  if (chargement) return <p>Chargement des prestations…</p>;
  if (erreur) return <p className="erreur">{erreur}</p>;
  if (prestations.length === 0) return <p>Aucune prestation pour le moment.</p>;
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

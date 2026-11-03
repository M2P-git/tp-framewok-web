// src/App.jsx : réserver un brushing (notions 9 à 11)
// L'API doit tourner : node api-simulee/serveur.mjs (dépôt des TP)
// Sans valider() (notion 8) : on voit ce que dit le serveur.
import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:3001/api';
const SALON = 'b-01';        // le Salon Yasmine
const PRESTATION = 'sv-004'; // un brushing
const COIFFEUSE = 'st-001';  // Siham

export default function App() {
  const [jour, setJour] = useState('');
  const [creneaux, setCreneaux] = useState([]);
  const [version, setVersion] = useState(0);
  const [heure, setHeure] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [accord, setAccord] = useState(false);
  const [message, setMessage] = useState('');

  // Les créneaux libres du jour choisi (notion 6) ;
  // changer version les recharge
  useEffect(() => {
    if (jour === '') return;
    async function charger() {
      const reponse = await fetch(API + '/businesses/' + SALON
        + '/availability?date=' + jour
        + '&serviceIds=' + PRESTATION + '&staffId=' + COIFFEUSE);
      const dispo = await reponse.json();
      setCreneaux(dispo.slots);
    }
    charger();
  }, [jour, version]);

  async function envoyer(e) {
    e.preventDefault();
    const reservation = {
      businessId: SALON,
      serviceIds: [PRESTATION],
      staffId: COIFFEUSE,
      date: jour,
      time: heure,
      customer: { firstName: prenom, lastName: nom, phone: telephone },
      consent: accord,
    };
    const reponse = await fetch(API + '/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation),
    });
    const donnees = await reponse.json();
    if (reponse.status === 201) {
      setMessage('Réservé : ' + donnees.id);
    } else if (reponse.status === 409) {
      setMessage(donnees.message); // le créneau vient d'être pris
      setHeure('');                // l'heure n'est plus bonne
      setVersion(version + 1);     // recharger les créneaux
    } else if (reponse.status === 422) {
      setMessage(Object.values(donnees.errors).join(' '));
    } else {
      setMessage('Erreur ' + reponse.status);
    }
  }

  return (
    <form onSubmit={envoyer}>
      <label>
        Jour{' '}
        <input type="date" value={jour}
          onChange={(e) => setJour(e.target.value)} />
      </label>
      <label>
        Heure{' '}
        <select value={heure} onChange={(e) => setHeure(e.target.value)}>
          <option value="">{creneaux.length} créneaux libres</option>
          {creneaux.map((creneau) => (
            <option key={creneau.time}>{creneau.time}</option>
          ))}
        </select>
      </label>
      <label>
        Prénom <input value={prenom}
          onChange={(e) => setPrenom(e.target.value)} />
      </label>
      <label>
        Nom <input value={nom}
          onChange={(e) => setNom(e.target.value)} />
      </label>
      <label>
        Téléphone <input type="tel" value={telephone}
          onChange={(e) => setTelephone(e.target.value)} />
      </label>
      <label>
        <input type="checkbox" checked={accord}
          onChange={(e) => setAccord(e.target.checked)} />
        {' '}J'accepte l'enregistrement de mes données
      </label>
      <button>Réserver</button>
      <p><strong>{message}</strong></p>
    </form>
  );
}

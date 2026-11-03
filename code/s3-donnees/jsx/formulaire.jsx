// src/App.jsx : un formulaire contrôlé (notion 7)
import { useState } from 'react';
import './App.css';

export default function App() {
  // Un état par champ
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [accord, setAccord] = useState(false);

  return (
    <form>
      <label>
        Prénom{' '}
        <input value={prenom}
          onChange={(e) => setPrenom(e.target.value)} />
      </label>
      <label>
        Téléphone{' '}
        <input type="tel" value={telephone}
          onChange={(e) => setTelephone(e.target.value)} />
      </label>
      <label>
        <input type="checkbox" checked={accord}
          onChange={(e) => setAccord(e.target.checked)} />
        {' '}J'accepte l'enregistrement de mes données
      </label>

      {/* Ce que React sait, à chaque frappe */}
      <p>Bonjour {prenom} ! Nous vous appellerons au {telephone}.</p>
      <p>Accord : {accord ? 'oui' : 'non'}</p>
    </form>
  );
}

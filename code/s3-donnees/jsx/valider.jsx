// src/App.jsx : valider avant d'envoyer (notion 8)
import { useState } from 'react';
import './App.css';

// 10 chiffres, commençant par 05, 06 ou 07
const TELEPHONE = /^0[5-7][0-9]{8}$/;

export default function App() {
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [accord, setAccord] = useState(false);
  const [erreurs, setErreurs] = useState({});
  const [message, setMessage] = useState('');

  // Renvoie un objet : un message par champ à corriger
  function valider() {
    const trouvees = {};
    // le prénom, sans les espaces autour
    if (prenom.trim().length < 2) {
      trouvees.prenom = 'Au moins 2 lettres.';
    }
    // le téléphone, sans ses espaces
    const chiffres = telephone.replaceAll(' ', '');
    if (!TELEPHONE.test(chiffres)) {
      trouvees.telephone = 'Exemple : 06 12 34 56 78.';
    }
    return trouvees;
  }

  function envoyer(e) {
    e.preventDefault(); // pas de rechargement de la page
    const trouvees = valider();
    setErreurs(trouvees);
    if (Object.keys(trouvees).length > 0) {
      setMessage('');
      return; // des erreurs : on n'envoie rien
    }
    setMessage('Tout est bon : la réservation peut partir.');
  }

  return (
    <form onSubmit={envoyer}>
      <label>
        Prénom{' '}
        <input value={prenom}
          onChange={(e) => setPrenom(e.target.value)} />
      </label>
      {erreurs.prenom && <p className="erreur">{erreurs.prenom}</p>}
      <label>
        Téléphone{' '}
        <input type="tel" value={telephone}
          onChange={(e) => setTelephone(e.target.value)} />
      </label>
      {erreurs.telephone && <p className="erreur">{erreurs.telephone}</p>}
      <label>
        <input type="checkbox" checked={accord}
          onChange={(e) => setAccord(e.target.checked)} />
        {' '}J'accepte l'enregistrement de mes données
      </label>
      <button>Réserver</button>
      <p>{message}</p>
    </form>
  );
}

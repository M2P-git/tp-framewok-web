// Exercice RE.5 : ranger le code en modules
//
// Un fichier EXPORTE ce qu'il veut partager, un autre l'IMPORTE. En React : un composant par fichier.
//   export const x = ...        un export NOMMÉ : on l'importe avec des accolades, import { x } from './fichier.js'
//   export default ...          l'export PAR DÉFAUT (un seul par fichier) : import nimporteQuelNom from './fichier.js'
//
// Dans CE fichier, écrivez :
//   1. un export nommé DEVISE, qui vaut 'MAD' ;
//   2. un export nommé formaterPrix(montant) : formaterPrix(3000) donne '3000 MAD' (utilisez DEVISE) ;
//   3. un export PAR DÉFAUT : une fonction resume(offre) qui donne 'PFE : API (3000 MAD)'
//      à partir de offre.title et offre.stipendMad (utilisez formaterPrix).
//
// Vérifier : node --test react/05-modules.test.js

// À écrire

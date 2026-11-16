// La « marque blanche » : les couleurs, la police et les arrondis d'un salon deviennent des
// variables CSS (--marque-primaire...), que styles.css utilise partout.
// Changer de salon change donc toute l'apparence, sans toucher au CSS ni aux composants.
// (Fonction fournie : on l'utilise dans App.jsx, on ne la réécrit pas.)
export function themeVersStyle(theme) {
  return {
    '--marque-primaire': theme.primary,
    '--marque-douce': theme.soft,
    '--marque-police': theme.fontFamily,
    '--marque-arrondi': theme.radius,
  };
}

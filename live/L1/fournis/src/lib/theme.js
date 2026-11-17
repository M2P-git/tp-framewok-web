// Thème d'un salon : couleurs, police et arrondis convertis en variables CSS
// (--marque-primaire, --marque-douce...), utilisées par styles.css.
// Un changement de salon modifie l'apparence sans modifier le CSS ni les composants.
// Fichier fourni.
export function themeVersStyle(theme) {
  return {
    '--marque-primaire': theme.primary,
    '--marque-douce': theme.soft,
    '--marque-police': theme.fontFamily,
    '--marque-arrondi': theme.radius,
  };
}

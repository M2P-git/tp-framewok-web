// Exercice RE.4 : le JSX, à la main
//
// Le JSX <h3 className="titre">PFE</h3> n'est pas du HTML : il est transformé en un appel de fonction
// qui renvoie un OBJET ordinaire qui DÉCRIT l'écran. React compare ces objets pour savoir ce qui a changé.
// Ici, vous écrivez cette fonction vous-même.
//
// 1. creerElement(type, props, ...enfants) renvoie { type, props } où props contient les props
//    reçues (props peut valoir null : traitez-le comme {}) ET une propriété `children` :
//      - aucun enfant      : pas de propriété children ;
//      - un seul enfant    : children est cet enfant ;
//      - plusieurs enfants : children est le TABLEAU des enfants.
//    creerElement('h3', { className: 'titre' }, 'PFE')
//      -> { type: 'h3', props: { className: 'titre', children: 'PFE' } }
// 2. carteOffre(offre, estFavori) utilise creerElement pour décrire :
//      <article className="carte">  (« carte est-favori » si estFavori)
//        <h3>{offre.title}</h3>
//        <p>{offre.companyName} · {offre.city}</p>
//      </article>
//
// Vérifier : node --test react/04-jsx-a-la-main.test.js

export function creerElement(type, props, ...enfants) {
  // À écrire
}

export function carteOffre(offre, estFavori) {
  // À écrire
}

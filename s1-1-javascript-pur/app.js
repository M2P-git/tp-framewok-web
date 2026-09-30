// Prototype BabStage, écrit en JavaScript « à la main », sans framework.
// Il affiche les offres et permet d'en marquer comme favorites.
// Consignes de l'exercice 1.2 : voir README.md

const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");

// Crée la carte HTML d'une offre, avec son bouton « Favori »
function creerCarte(offre) {
  const carte = document.createElement("article");
  carte.className = "carte";
  carte.innerHTML = `
    <h3>${offre.title}</h3>
    <p class="entreprise">${offre.companyName} · ${offre.city}</p>
    <button class="favori">☆ Favori</button>
  `;

  const bouton = carte.querySelector(".favori");
  bouton.addEventListener("click", () => {
    carte.classList.toggle("est-favori");
    if (carte.classList.contains("est-favori")) {
      bouton.textContent = "★ Favori";
      compteur.textContent = Number(compteur.textContent) + 1;
    } else {
      bouton.textContent = "☆ Favori";
      compteur.textContent = Number(compteur.textContent) - 1;
    }
  });
  return carte;
}

// Affichage initial : toutes les offres
for (const offre of OFFRES) {
  liste.appendChild(creerCarte(offre));
}

// Étape 3 de l'exercice : écrivez ici le filtre par ville.

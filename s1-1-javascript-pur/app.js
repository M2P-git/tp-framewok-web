// Prototype Mawid, écrit en JavaScript « à la main », sans framework.
// Il affiche les prestations d'un salon ; le client en ajoute à sa sélection,
// et le haut de la page affiche le nombre de prestations choisies et le total.
// Consignes de l'exercice 1.2 : voir README.md

const liste = document.querySelector("#liste");
const compteur = document.querySelector("#compteur");
const total = document.querySelector("#total");

// Crée la carte HTML d'une prestation, avec son bouton « Ajouter »
function creerCarte(prestation) {
  const carte = document.createElement("article");
  carte.className = "carte";
  carte.innerHTML = `
    <h3>${prestation.name}</h3>
    <p class="details">${prestation.durationMinutes} min · ${prestation.priceMad} DH</p>
    <button class="choisir">＋ Ajouter</button>
  `;

  const bouton = carte.querySelector(".choisir");
  bouton.addEventListener("click", () => {
    carte.classList.toggle("est-choisie");
    if (carte.classList.contains("est-choisie")) {
      bouton.textContent = "✓ Ajoutée";
      compteur.textContent = Number(compteur.textContent) + 1;
      total.textContent = Number(total.textContent) + prestation.priceMad;
    } else {
      bouton.textContent = "＋ Ajouter";
      compteur.textContent = Number(compteur.textContent) - 1;
      total.textContent = Number(total.textContent) - prestation.priceMad;
    }
  });
  return carte;
}

// Affichage initial : toutes les prestations
for (const prestation of PRESTATIONS) {
  liste.appendChild(creerCarte(prestation));
}

// Étape 3 de l'exercice : écrivez ici le filtre par catégorie.

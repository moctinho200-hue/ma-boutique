const prixUnitaire = 25000;
let quantite = 1;

const quantiteEl = document.getElementById("quantite");
const totalEl = document.getElementById("total");
const messageEl = document.getElementById("message");

function afficher() {
  quantiteEl.textContent = quantite;
  totalEl.textContent = (prixUnitaire * quantite).toLocaleString("fr-FR");
  messageEl.textContent = "";
}

document.getElementById("plus").addEventListener("click", function () {
  quantite = quantite + 1;
  afficher();
});

document.getElementById("moins").addEventListener("click", function () {
  if (quantite > 1) {
    quantite = quantite - 1;
    afficher();
  }
});

document.getElementById("acheter").addEventListener("click", function () {
  const total = (prixUnitaire * quantite).toLocaleString("fr-FR");
  messageEl.textContent = "Merci ! " + quantite + " exemplaire(s) pour " + total + " FCFA.";
});

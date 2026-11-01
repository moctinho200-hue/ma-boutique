const catalogue = document.getElementById("catalogue");
const listePanierEl = document.getElementById("liste-panier");
const totalPanierEl = document.getElementById("total-panier");
const messageEl = document.getElementById("message");
const boutonCommander = document.getElementById("commander");

let panier = [];

function formaterPrix(prix) {
  return prix.toLocaleString("fr-FR") + " FCFA";
}

function afficherPanier() {
  listePanierEl.innerHTML = "";
  let total = 0;

  panier.forEach(function (article, position) {
    total = total + article.prix;

    const ligne = document.createElement("li");
    ligne.textContent = article.nom + " - pointure " + article.taille + " - " + formaterPrix(article.prix) + " ";

    const retirer = document.createElement("button");
    retirer.textContent = "Retirer";
    retirer.className = "retirer";
    retirer.addEventListener("click", function () {
      panier.splice(position, 1);
      afficherPanier();
    });

    ligne.appendChild(retirer);
    listePanierEl.appendChild(ligne);
  });

  if (panier.length === 0) {
    listePanierEl.innerHTML = "<li>Votre panier est vide.</li>";
  }

  totalPanierEl.textContent = formaterPrix(total);
}

produits.forEach(function (produit) {
  const carte = document.createElement("article");
  carte.className = "carte";

  let options = "";
  produit.tailles.forEach(function (taille) {
    options += "<option value=\"" + taille + "\">" + taille + "</option>";
  });

  let photo = "";
  if (produit.image) {
    photo = "<img src=\"" + produit.image + "\" alt=\"" + produit.nom + "\">";
  }

  carte.innerHTML =
    photo +
    "<h2>" + produit.nom + "</h2>" +
    "<p class=\"prix\">" + formaterPrix(produit.prix) + "</p>" +
    "<label>Pointure : <select>" + options + "</select></label><br>" +
    "<button>Ajouter au panier</button>";

  carte.querySelector("button").addEventListener("click", function () {
    const taille = carte.querySelector("select").value;
    panier.push({ nom: produit.nom, prix: produit.prix, taille: taille });
    messageEl.textContent = produit.nom + " (pointure " + taille + ") ajouté au panier.";
    afficherPanier();
  });

  catalogue.appendChild(carte);
});

boutonCommander.addEventListener("click", function () {
  if (panier.length === 0) {
    messageEl.textContent = "Ajoutez d'abord un article au panier.";
    return;
  }

  let total = 0;
  let texte = "Bonjour, je souhaite commander :\n";
  panier.forEach(function (article) {
    total = total + article.prix;
    texte += "- " + article.nom + ", pointure " + article.taille + ", " + formaterPrix(article.prix) + "\n";
  });
  texte += "Total : " + formaterPrix(total);

  const lien = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(texte);
  window.open(lien, "_blank");
});

afficherPanier();

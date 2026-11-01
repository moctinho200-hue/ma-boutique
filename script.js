const numeroWhatsApp = "2250720126197";

const produits = [
  { nom: "Sandale cuir Hermes", prix: 25000, image: "images/hermes.jpeg", tailles: [40, 41, 42, 43, 44, 45] },
  { nom: "Sandale sport noire", prix: 25000, image: "", tailles: [40, 41, 42, 43, 44, 45] },
  { nom: "Claquette confort", prix: 25000, image: "", tailles: [40, 41, 42, 43, 44, 45] },
  { nom: "Sandale cuir Marron", prix: 25000, image: "images/chypre.jpeg", tailles: [40, 41, 42, 43, 44, 45] }
];

const catalogue = document.getElementById("catalogue");
const messageEl = document.getElementById("message");

function formaterPrix(prix) {
  return prix.toLocaleString("fr-FR") + " FCFA";
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
    "<button>Commander sur WhatsApp</button>";

  carte.querySelector("button").addEventListener("click", function () {
    const taille = carte.querySelector("select").value;
    const texte =
      "Bonjour, je souhaite commander : " + produit.nom +
      ", pointure " + taille + ", prix " + formaterPrix(produit.prix) + ".";
    const lien = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(texte);

    messageEl.textContent = "Ouverture de WhatsApp pour : " + produit.nom + ", pointure " + taille + ".";
    window.open(lien, "_blank");
  });

  catalogue.appendChild(carte);
});

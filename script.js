const produits = [
  { nom: "Sandale cuir marron", prix: 8000, tailles: [40, 41, 42, 43, 44, 45] },
  { nom: "Sandale sport noire", prix: 6000, tailles: [40, 41, 42, 43, 44, 45] },
  { nom: "Claquette confort", prix: 4000, tailles: [40, 41, 42, 43, 44, 45] }
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

  carte.innerHTML =
    "<h2>" + produit.nom + "</h2>" +
    "<p class=\"prix\">" + formaterPrix(produit.prix) + "</p>" +
    "<label>Pointure : <select>" + options + "</select></label><br>" +
    "<button>Commander</button>";

  carte.querySelector("button").addEventListener("click", function () {
    const taille = carte.querySelector("select").value;
    messageEl.textContent =
      "Commande : " + produit.nom + ", pointure " + taille + ", " + formaterPrix(produit.prix) + ".";
  });

  catalogue.appendChild(carte);
});

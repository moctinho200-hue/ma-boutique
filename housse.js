const zoneLot = document.getElementById("lot-housse");

if (zoneLot && typeof lotHousse !== "undefined" && lotHousse.images.length > 0) {
  let choix = -1;

  let optionsTailles = "";
  lotHousse.tailles.forEach(function (taille) {
    optionsTailles += "<option value=\"" + taille + "\">" + taille + "</option>";
  });

  zoneLot.innerHTML =
    "<h2>" + lotHousse.titre + "</h2>" +
    "<p class=\"prix\">" + formaterPrix(lotHousse.prix) + "</p>" +
    "<span class=\"etiquette\">Livrées en housse (sans boîte)</span>" +
    "<p>Touchez la photo du modèle que vous voulez.</p>" +
    "<div class=\"galerie\"></div>" +
    "<label>Pointure : <select class=\"choix-taille-lot\">" + optionsTailles + "</select></label><br>" +
    "<button class=\"ajouter-lot\">Ajouter au panier</button>";

  const galerie = zoneLot.querySelector(".galerie");
  const vignettes = [];

  lotHousse.images.forEach(function (chemin, index) {
    const figure = document.createElement("figure");
    figure.innerHTML =
      "<img loading=\"lazy\" src=\"" + chemin + "\" alt=\"Modèle " + (index + 1) + "\">" +
      "<figcaption>Réf. " + (index + 1) + "</figcaption>";

    figure.addEventListener("click", function () {
      choix = index;
      vignettes.forEach(function (autre) {
        autre.classList.remove("choisie");
      });
      figure.classList.add("choisie");
    });

    vignettes.push(figure);
    galerie.appendChild(figure);
  });

  zoneLot.querySelector(".ajouter-lot").addEventListener("click", function () {
    if (choix === -1) {
      messageEl.textContent = "Choisissez d'abord la photo du modèle.";
      return;
    }

    const taille = zoneLot.querySelector(".choix-taille-lot").value;
    const nom = lotHousse.nomArticle + " Réf. " + (choix + 1);

    const existant = panier.find(function (article) {
      return article.nom === nom && article.taille === taille;
    });

    if (existant) {
      existant.quantite = existant.quantite + 1;
    } else {
      panier.push({ nom: nom, prix: lotHousse.prix, taille: taille, couleur: "", quantite: 1 });
    }

    messageEl.textContent = nom + ", pointure " + taille + " ajouté au panier.";
    afficherPanier();
  });
}

const zoneLot = document.getElementById("lot-housse");

if (zoneLot && typeof lotHousse !== "undefined" && lotHousse.images.length > 0) {
  let optionsTailles = "";
  lotHousse.tailles.forEach(function (taille) {
    optionsTailles += "<option value=\"" + taille + "\">" + taille + "</option>";
  });

  zoneLot.innerHTML =
    "<h2>" + lotHousse.titre + "</h2>" +
    "<p class=\"prix\">" + formaterPrix(lotHousse.prix) + "</p>" +
    "<span class=\"etiquette\">Livrées en housse (sans boîte)</span>" +
    "<div class=\"galerie\"></div>";

  const galerie = zoneLot.querySelector(".galerie");

  lotHousse.images.forEach(function (chemin, index) {
    const nom = lotHousse.nomArticle + " Réf. " + (index + 1);

    const figure = document.createElement("figure");
    figure.innerHTML =
      "<img loading=\"lazy\" src=\"" + chemin + "\" alt=\"" + nom + "\">" +
      "<figcaption>Réf. " + (index + 1) + "</figcaption>" +
      "<label>Pointure : <select class=\"choix-taille-lot\">" + optionsTailles + "</select></label>" +
      "<button>Ajouter au panier</button>";

    figure.querySelector("button").addEventListener("click", function () {
      const taille = figure.querySelector(".choix-taille-lot").value;

      const existant = panier.find(function (article) {
        return article.nom === nom && article.taille === taille;
      });

      if (existant) {
        existant.quantite = existant.quantite + 1;
      } else {
        panier.push({ nom: nom, prix: lotHousse.prix, taille: taille, couleur: "", quantite: 1, image: chemin });
      }

      messageEl.textContent = nom + ", pointure " + taille + " ajouté au panier.";
      afficherPanier();

      if (typeof ouvrirWhatsAppApresAjout !== "undefined" && ouvrirWhatsAppApresAjout) {
        boutonCommander.click();
      }
    });

    galerie.appendChild(figure);
  });
}


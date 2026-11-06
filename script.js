const catalogue = document.getElementById("catalogue");
const listePanierEl = document.getElementById("liste-panier");
const totalPanierEl = document.getElementById("total-panier");
const messageEl = document.getElementById("message");
const boutonCommander = document.getElementById("commander");
const compteurEl = document.getElementById("compteur-panier");

let panier = [];
try { const sauvegarde = localStorage.getItem("panierBoutique"); if (sauvegarde) { panier = JSON.parse(sauvegarde); } } catch (erreur) { panier = []; }
if (!Array.isArray(panier)) { panier = []; }
function sauvegarderPanier() { try { localStorage.setItem("panierBoutique", JSON.stringify(panier)); } catch (erreur) { } }
const cartes = [];

function urlPhoto(chemin) { return new URL(chemin, window.location.href).href; }
function formaterPrix(prix) {
  return prix.toLocaleString("fr-FR") + " FCFA";
}

function nomComplet(article) {
  if (article.couleur) {
    return article.nom + " (" + article.couleur + ")";
  }
  return article.nom;
}

function creerPetitBouton(texte, action) {
  const bouton = document.createElement("button");
  bouton.textContent = texte;
  bouton.className = "retirer";
  bouton.addEventListener("click", action);
  return bouton;
}

function afficherPanier() {
  listePanierEl.innerHTML = "";
  let total = 0;
  let nombreArticles = 0;

  panier.forEach(function (article, position) {
    const sousTotal = article.prix * article.quantite;
    total = total + sousTotal;
    nombreArticles = nombreArticles + article.quantite;

    const ligne = document.createElement("li");
    ligne.textContent =
      nomComplet(article) + " - pointure " + article.taille +
      " - " + formaterPrix(article.prix) + " x " + article.quantite +
      " = " + formaterPrix(sousTotal) + " ";

    ligne.appendChild(creerPetitBouton("-", function () {
      if (article.quantite > 1) {
        article.quantite = article.quantite - 1;
      } else {
        panier.splice(position, 1);
      }
      afficherPanier();
    }));

    ligne.appendChild(creerPetitBouton("+", function () {
      article.quantite = article.quantite + 1;
      afficherPanier();
    }));

    ligne.appendChild(creerPetitBouton("Retirer", function () {
      panier.splice(position, 1);
      afficherPanier();
    }));

    listePanierEl.appendChild(ligne);
  });

  if (panier.length === 0) {
    listePanierEl.innerHTML = "<li>Votre panier est vide.</li>";
  }

  totalPanierEl.textContent = formaterPrix(total); sauvegarderPanier();
  if (compteurEl) {
    compteurEl.textContent = nombreArticles;
  }
}

produits.forEach(function (produit) {
  let couleurs = [{ nom: "", image: produit.image || "" }];
  if (produit.couleurs && produit.couleurs.length > 0) {
    couleurs = produit.couleurs;
  }

  let choixActif = couleurs.length > 1;
  if (produit.choixCouleur !== undefined) {
    choixActif = produit.choixCouleur;
  }

  const emballage = produit.emballage || "boite";
  let etiquette = "Livrée avec boîte";
  if (emballage === "housse") {
    etiquette = "Livrée en housse (sans boîte)";
  }

  const carte = document.createElement("article");
  carte.className = "carte";
  carte.dataset.emballage = emballage;

  let optionsTailles = "";
  produit.tailles.forEach(function (taille) {
    optionsTailles += "<option value=\"" + taille + "\">" + taille + "</option>";
  });

  let blocCouleur = "";
  if (choixActif) {
    let optionsCouleurs = "";
    couleurs.forEach(function (couleur, index) {
      optionsCouleurs += "<option value=\"" + index + "\">" + couleur.nom + "</option>";
    });
    blocCouleur =
      "<div class=\"ligne-choix\"><label>Couleur : <select class=\"choix-couleur\">" +
      optionsCouleurs + "</select></label></div>";
  }

  carte.innerHTML =
    "<div class=\"zone-photo\"></div>" +
    "<h2>" + produit.nom + "</h2>" +
    "<span class=\"etiquette\">" + etiquette + "</span>" +
    blocCouleur +
    "<p class=\"prix\">" + formaterPrix(produit.prix) + "</p>" +
    "<label>Pointure : <select class=\"choix-taille\">" + optionsTailles + "</select></label><br>" +
    "<button>Ajouter au panier</button>";

  const zonePhoto = carte.querySelector(".zone-photo");
  const choixCouleur = carte.querySelector(".choix-couleur");

  function couleurChoisie() {
    if (choixCouleur) {
      return couleurs[choixCouleur.value];
    }
    return couleurs[0];
  }

  function afficherPhoto() {
    const couleur = couleurChoisie();
    if (couleur.image) {
      zonePhoto.innerHTML = "<img src=\"" + couleur.image + "\" alt=\"" + produit.nom + " " + couleur.nom + "\">";
    } else {
      zonePhoto.innerHTML = "<div class=\"sans-photo\">Photo bientôt</div>";
    }
  }

  afficherPhoto();

  if (choixCouleur) {
    choixCouleur.addEventListener("change", afficherPhoto);
  }

  carte.querySelector("button").addEventListener("click", function () {
    const taille = carte.querySelector(".choix-taille").value;
    let couleur = "";
    if (choixActif) {
      couleur = couleurChoisie().nom;
    }

    const existant = panier.find(function (article) {
      return article.nom === produit.nom && article.taille === taille && article.couleur === couleur;
    });

    if (existant) {
      existant.quantite = existant.quantite + 1;
    } else {
      panier.push({ nom: produit.nom, prix: produit.prix, taille: taille, couleur: couleur, quantite: 1, image: couleurChoisie().image });
    }

    messageEl.textContent = nomComplet({ nom: produit.nom, couleur: couleur }) + ", pointure " + taille + " ajouté au panier."; if (typeof ouvrirWhatsAppApresAjout !== "undefined" && ouvrirWhatsAppApresAjout) { boutonCommander.click(); }
    afficherPanier();
  });

  cartes.push(carte);
  catalogue.appendChild(carte);
});

document.querySelectorAll(".filtres button").forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    const filtre = bouton.dataset.filtre;

    document.querySelectorAll(".filtres button").forEach(function (autre) {
      autre.classList.remove("actif");
    });
    bouton.classList.add("actif");

    cartes.forEach(function (carte) {
      if (filtre === "tous" || carte.dataset.emballage === filtre) {
        carte.style.display = "";
      } else {
        carte.style.display = "none";
      }
    });
  });
});

boutonCommander.addEventListener("click", function () {
  if (panier.length === 0) {
    messageEl.textContent = "Ajoutez d'abord un article au panier.";
    return;
  }

  let total = 0;
  let texte = "Bonjour, je souhaite commander :\n";
  panier.forEach(function (article) {
    const sousTotal = article.prix * article.quantite;
    total = total + sousTotal;
    texte += "- " + nomComplet(article) + ", pointure " + article.taille +
      ", quantité " + article.quantite + ", " + formaterPrix(sousTotal) + (article.image ? "\n   Photo : " + urlPhoto(article.image) : "") + "\n";
  });
  texte += "Total : " + formaterPrix(total);

  const lien = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(texte);
  window.open(lien, "_blank");
});

afficherPanier();







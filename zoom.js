(function () {
  const fond = document.createElement("div");
  fond.className = "zoom-fond";
  fond.innerHTML =
    "<button class=\"zoom-fermer\" aria-label=\"Fermer\">&times;</button>" +
    "<img class=\"zoom-img\" alt=\"\">" +
    "<p class=\"zoom-legende\"></p>";
  document.body.appendChild(fond);

  const grandeImage = fond.querySelector(".zoom-img");
  const legende = fond.querySelector(".zoom-legende");

  function ouvrir(source, texte) {
    grandeImage.src = source;
    grandeImage.alt = texte || "";
    legende.textContent = texte || "";
    fond.classList.add("ouvert");
    document.body.style.overflow = "hidden";
  }

  function fermer() {
    fond.classList.remove("ouvert");
    grandeImage.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (evenement) {
    const image = evenement.target.closest(".carte img, .galerie img");
    if (image) {
      ouvrir(image.src, image.alt);
    }
  });

  fond.addEventListener("click", fermer);

  document.addEventListener("keydown", function (evenement) {
    if (evenement.key === "Escape") {
      fermer();
    }
  });
})();

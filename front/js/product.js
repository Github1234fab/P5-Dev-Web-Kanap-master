// récupération de l'url
let url = window.location.search;

// récupération des keys/values de l'url
let para = new URLSearchParams(url);
let id = para.get("id");

// requête fetch
fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((data) => {
    // Affichage image produit
    let image_product = document.querySelector(".item__img");
    let IMG = document.createElement("img");
    IMG.src = data.imageUrl;
    IMG.setAttribute("alt", data.altTxt);
    image_product.appendChild(IMG);
  
    // Affichage nom produit
    let name_product = document.querySelector("#title");
    name_product.innerHTML = data.name;

    // Affichage description produit
    let description_product = document.querySelector("#description");
    description_product.innerHTML = data.description;

    // Affichage prix produit
    let price_product = document.querySelector("#price");
    price_product.innerHTML = data.price;

    let option;
    // Select=Couleur
    let select;

    // récupèration tableau color
    for (let i = 0; i < data.colors.length; i++) {
      option = document.createElement("option");
      option.setAttribute("value", data.colors[i]);
      option.textContent = data.colors[i];
      select = document.getElementById("colors");
      select.appendChild(option);
    }

    // récupération de la quantité
    let input_quantité = document.getElementById("quantity");
    // récupération et écoute du bouton panier
    let bouton_panier = document.getElementById("addToCart");
    bouton_panier.addEventListener("click", test_panier);

    // fonction id.push couleur.push et qté.push dans array_panier
    function test_panier() {
      if (select.value == "") {
        alert("veuillez saisir une couleur, svp!");
      } else if (input_quantité.value == 0) {
        alert("veuillez saisir une quantité svp!");
      } else if (input_quantité.value < 0) {
        alert("Veuillez saisir une quantité supérieure à 0, svp!");
      } else if (input_quantité.value > 100) {
        alert("Veuillez saisir une quantité inférieure à 100, svp!");
      } else {
        let canap = {
          id: id,
          couleur: select.value,
          quantité: input_quantité.value,
        };

        let panier = localStorage.getItem("choix_client");
        if (panier == null) {
          panier = [];
        } else {
          panier = JSON.parse(panier);
        }
        let trouve = 0;
        for (let i = 0; i < panier.length; i++) {
          if (canap.id == panier[i].id && canap.couleur == panier[i].couleur) {
            trouve = 1;
            if (Number(panier[i].quantité) + Number(canap.quantité) <= 100) {
              panier[i].quantité = Number(panier[i].quantité) + Number(canap.quantité);
            } else {
              alert("Veuillez respecter une quantité inférieure à 100 svp!");
            }
          }
        }
        if (trouve == 0) {
          panier.push(canap);
        }

        // // envoi vers LS
        let envoi_panier = localStorage.setItem("choix_client", JSON.stringify(panier));
  
        // récupération du storage
        let récup_storage = JSON.parse(localStorage.getItem("choix_client"));
      }
    }
  });

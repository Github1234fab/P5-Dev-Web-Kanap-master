// récupération de l'url
let url = window.location.search;
console.log(url);

// récupération des keys/values de l'url
let para = new URLSearchParams(url);
let id = para.get("id");
// console.log(id);

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
    ("");

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
    // bouton_panier.addEventListener("click", test_panier);
    bouton_panier.addEventListener("click", test_panier);

    // Tableau pour stocker id, couleur, quantité
    let array_panier = [];

    // fonction id.push couleur.push et qté.push dans array_panier
    function test_panier() {
      if (select.value === "") {
        alert("veuillez saisir une couleur svp!");
      }
      if (input_quantité.value == 0) {
        alert("veuillez saisir une quantité svp!");
      } else {
        let ajout_id = array_panier.push(id);
        let ajout_couleur = array_panier.push(select.value);
        let ajout_quantité = array_panier.push(input_quantité.value);

        // envoi vers LS
        let envoi_panier = localStorage.setItem("choix_client", JSON.stringify(array_panier));
        // console.log(array_panier);
      }}
  });





















// function stockage(e){
// e.preventDefault();
// let choix_utilisateur  = {
//   id: id,
//   couleur: select.value,
//   qté: input_quantité.value}

// // création stockage local en string
// let stockage_localStorage = JSON.stringify(choix_utilisateur);
// // création localStorage
// localStorage.setItem("choix", stockage_localStorage);
// // récupération localStorage
// let récupération_stockage_localStorage = JSON.parse(localStorage.getItem("choix"));
// console.log(récupération_stockage_localStorage);
// array_panier.push(récupération_stockage_localStorage);
// console.log(array_panier);
// }

// récupération de l'url
let url = window.location.search;
// console.log(url);

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
    // bouton_panier.addEventListener("click", test_panier);
    bouton_panier.addEventListener("click", test_panier);

    // fonction id.push couleur.push et qté.push dans array_panier
    function test_panier() {
      if (select.value === "") {
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
        for (let i = 0; i<panier.length; i++){
          if( canap.id == panier[i].id && canap.couleur == panier[i].couleur){
            trouve = 1;
            if (Number(panier[i].quantité)+Number(canap.quantité)<=100){
              panier[i].quantité = Number(panier[i].quantité)+Number(canap.quantité);
            } else {
              alert("Veuillez respecter une quantité inférieure à 100");
            }
          }
        }
        if (trouve == 0){
          panier.push(canap);
        }
      
        // console.log(panier);

        // envoi vers LS
        let envoi_panier = localStorage.setItem("choix_client", JSON.stringify(panier));

        // récupération du storage
        let récup_storage = JSON.parse(localStorage.getItem("choix_client"));

    //     //RÉCUP+ADDITION+PUSH DES QUANTITÉS
    //     //récupération du storage filtré avec .filter() qui a pour condition de faire remonter les mm couleur et mm id que canap. On obtient tous les objets similaires, avec des quantités différentes, naturellement (...).
    //     let filter_récup_storage = récup_storage.filter((el) => el.couleur === canap.couleur && el.id === canap.id);
    //     // console.log(filter_récup_storage);
    //     //les objets obtenus similaires à canap, sont "mapés" avec .map() qui permet de récupérer seulement la quantité pour chaque objet
    //     //IMPOSSIBLE de parse_int, ou Number, ou JSON.parse (...). Astuce trouvée sur OC, faire *1, convertit une chaîne, directement en nombre.
    //     let quantité_map_récup_storage = filter_récup_storage.map((el) => el.quantité * 1);
    //     // console.log(quantité_map_récup_storage);
    //     // avec .reduce, j'additionne les valeurs du tableau
    //     let addition_des_quantités = quantité_map_récup_storage.reduce((a, b) => a + b);
    //     // console.log(addition_des_quantités);
    //     // la valeur de la clefs quantité de l'objet canap est modifiée et je passe à la place la quantité total des objets similaires.
    //     canap.quantité = addition_des_quantités;
    //        // // Suppression des objets similaires en utilisant .splice(0 = index, 1000 égal nombre d'objets supprimés. Existe-t-il une autre solution que 1000, existe-t-il un truc pour dire tous les objets?)
    //       //  let supprimer_objets_similaires = filter_récup_storage.splice(0, 1000);
    //      // console.log(supprimer_objets_similaires);
    // ;
    //     console.log(panier);
      }
    }
  });

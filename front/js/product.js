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
        panier.push(canap);
        // envoi vers LS
        let envoi_panier = localStorage.setItem("choix_client", JSON.stringify(panier));

        // récupération du storage
        let récup_storage = JSON.parse(localStorage.getItem("choix_client"));
//récupération du storage filtré avec .filter() qui a pour condition de faire remonter les mm couleur et mm id que canap. On obtient tous les objets similaires, avec des quantités différentes, naturellement (...).
        let filter_récup_storage = récup_storage.filter((el) => el.couleur === canap.couleur && el.id === canap.id);
        console.log(filter_récup_storage);
   //les objets obtenus similaires à canap, sont "mapés" avec .map() qui permet de récupérer seulement la quanité pour chaque objet
   //IMPOSSIBLE de parse_int, ou Number, ou SJON.parse (...). Astuce trouvée sur OC, faire *1, convertit une chaîne, directement en nombre!!
        let quantité_map_récup_storage = filter_récup_storage.map((el) => el.quantité*1);
        console.log(quantité_map_récup_storage);
    // avec .reduce (les méthodes de tableaux par le web designer), on peut additionner les valeurs du tableau
        let addition_des_quantités =  quantité_map_récup_storage.reduce((a,b) => a+b);
        console.log(addition_des_quantités);
      

    //     for (let i in quantité_map_récup_storage) {
    //       let tableau = [];
    //       tableau.push(quantité_map_récup_storage[i]*1);
    // tableau.reduce((a,b) => a+b);
    //       console.log(tableau);

    //     }
    





        // console.log(JSON.parse(quantité_map_récup_storage));

        // let addition_quantité_récup_storage=  (ParseInt_quantité_map_récup_storage.reduce((a, b) => a+b));
        // console.log(addition_quantité_récup_storage);

        // let supprim_canap_similaire = filter_récup_storage.splice(0, 100);
        // console.log(supprim_canap_similaire);
      }
    }
  });

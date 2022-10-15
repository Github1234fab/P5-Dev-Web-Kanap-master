let récupération_panier = JSON.parse(localStorage.getItem("choix_client"));
console.log(récupération_panier);



//boucle récupération des ID du panier
for (let i in récupération_panier){
  let index_id = récupération_panier[i].id;
  console.log(index_id);


fetch("http://localhost:3000/api/products/"+index_id)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Récupération section DOM
    let section_dom = document.getElementById("cart__items");

    // création article+data-id, data-color
    let article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", récupération_panier[i].id);
    article.setAttribute("data-color", récupération_panier[i].couleur);
    section_dom.appendChild(article);

// // création div "cart__item__img"
let div_img = document.createElement("div");
div_img.setAttribute("class", "cart__item__img");
section_dom.appendChild(div_img);
// // création IMG de DIV "cart__item__img"
let IMG_panier = document.createElement("img");
IMG_panier.src = data.imageUrl;
IMG_panier.setAttribute("alt", data.altTxt);
div_img.appendChild(IMG_panier);


// création div "cart__item__content"
let div_item_content = document.createElement("div");
div_item_content.setAttribute("class", "cart__item__content");
section_dom.appendChild(div_item_content);



// création div  "cart__item__content__description"
let div_item_content_description = document.createElement("div");
div_item_content_description.setAttribute("class", "cart__item__content__description");
section_dom.appendChild(div_item_content_description);
// création H2 de div  "cart__item__content__description"
let h2 = document.createElement("h2");
h2.innerHTML = data.name;
div_item_content_description.appendChild(h2);

// création P/couleur de div  "cart__item__content__description"
let p_couleur = document.createElement("p");
p_couleur.innerHTML = récupération_panier[i].couleur;
div_item_content_description.appendChild(p_couleur);

// création P/couleur de div  "cart__item__content__description"
let p_prix = document.createElement("p");
p_prix.innerHTML = data.price;
div_item_content_description.appendChild(p_prix);

// création div   "cart__item__content__settings"
let div_cart_item_content_settings = document.createElement("div");
div_cart_item_content_settings.setAttribute("class", "cart__item__content__settings");
section_dom.appendChild(div_cart_item_content_settings);

// Création div "cart__item__content__settings__quantity"
let div_cart_item_content_settings_quantity = document.createElement("div");
div_cart_item_content_settings_quantity.setAttribute("class", "cart__item__content__settings__quantity");
section_dom.appendChild(div_cart_item_content_settings_quantity);
// création P/quantité de  "cart__item__content__settings__quantity"
let p_qté = document.createElement("p");
p_qté.innerHTML = récupération_panier[i].quantité;
div_cart_item_content_settings_quantity.appendChild(p_qté);

// Création input class="itemQuantity"
let input = document.createElement("input");
input.setAttribute("class", "itemQuantity");
input.setAttribute("name", "itemQuantity");
input.setAttribute("min", "1");
input.setAttribute("max", "100");
input.setAttribute("value", "42");
div_cart_item_content_settings_quantity.appendChild(input);

  // Création div "cart__item__content__settings__delete"
  let div_cart_item_content_settings_delete = document.createElement("div");
  div_cart_item_content_settings_delete.setAttribute("class", "div_cart_item_content_settings_delete");
  section_dom.appendChild(div_cart_item_content_settings_delete);
  // Création p "deleteItem"
  let p_delete = document.createElement("p");
  p_delete.setAttribute("class", "deleteItem");
  div_cart_item_content_settings_delete.appendChild(p_delete);

  let texte_p_delete = document.createTextNode("Supprimer");
  p_delete.appendChild(texte_p_delete);

});
}


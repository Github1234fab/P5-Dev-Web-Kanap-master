
// récupération panier
let récupération_panier = JSON.parse(localStorage.getItem('choix_client'));


// Récupération section du DOM
let section_dom = document.getElementById("cart__items");
// création article+data-id, data-color
let article = document.createElement("article");
article.setAttribute("data-id", récupération_panier[0]);
section_dom.appendChild(article);
article.setAttribute("data-color", récupération_panier[1]);
section_dom.appendChild(article);

let IMG_panier = document.createElement("img");
IMG_panier.src = 









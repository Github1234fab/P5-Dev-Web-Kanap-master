
// récupération de l'url
let url = window.location.search;


// récupération des keys/values de l'url
let valeur = new URLSearchParams(url);
let order = valeur.get("id");

let order_id = document.getElementById("orderId");
order_id.innerText = order;

localStorage.clear();
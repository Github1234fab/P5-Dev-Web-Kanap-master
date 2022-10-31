
// récupération de l'url
let url = window.location.search;
console.log(url);

// récupération des keys/values de l'url
let valeur = new URLSearchParams(url);
let order = valeur.get("id");
console.log(order);

let order_id = document.getElementById("orderId");
order_id.innerText = order;
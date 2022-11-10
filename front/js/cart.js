let récupération_panier = JSON.parse(localStorage.getItem("choix_client"));

let quantité_total = 0;
let montant_total = 0;
// boucle récupération des ID du panier
for (let i in récupération_panier) {
  let index_id = récupération_panier[i].id;

  fetch("http://localhost:3000/api/products/" + index_id)
    .then((response) => response.json())
    .then((data) => {
      quantité_total = quantité_total + Number(récupération_panier[i].quantité);
      montant_total = montant_total + Number(récupération_panier[i].quantité) * Number(data.price);

      document.getElementById("totalQuantity").textContent = quantité_total;
      document.getElementById("totalPrice").textContent = montant_total;

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
      article.appendChild(div_img);

      // // création IMG de DIV "cart__item__img"
      let IMG_panier = document.createElement("img");
      IMG_panier.src = data.imageUrl;
      IMG_panier.setAttribute("alt", data.altTxt);
      div_img.appendChild(IMG_panier);

      // création div "cart__item__content"
      let div_item_content = document.createElement("div");
      div_item_content.setAttribute("class", "cart__item__content");
      article.appendChild(div_item_content);

      // création div  "cart__item__content__description"
      let div_item_content_description = document.createElement("div");
      div_item_content_description.setAttribute("class", "cart__item__content__description");
      article.appendChild(div_item_content_description);

      // création H2 de div  "cart__item__content__description"
      let h2 = document.createElement("h2");
      h2.innerHTML = data.name;
      div_item_content_description.appendChild(h2);

      // création P/couleur de div  "cart__item__content__description"
      let p_couleur = document.createElement("p");
      p_couleur.innerHTML = récupération_panier[i].couleur;
      div_item_content_description.appendChild(p_couleur);

      // création P/rpix de div  "cart__item__content__description"
      let p_prix = document.createElement("p");
      p_prix.innerHTML = data.price;
      div_item_content_description.appendChild(p_prix);

      // création div   "cart__item__content__settings"
      let div_cart_item_content_settings = document.createElement("div");
      div_cart_item_content_settings.setAttribute("class", "cart__item__content__settings");
      article.appendChild(div_cart_item_content_settings);

      // Création div "cart__item__content__settings__quantity"
      let div_cart_item_content_settings_quantity = document.createElement("div");
      div_cart_item_content_settings_quantity.setAttribute("class", "cart__item__content__settings__quantity");
      div_cart_item_content_settings.appendChild(div_cart_item_content_settings_quantity);

      // création P/quantité de  "cart__item__content__settings__quantity"
      let p_qté = document.createElement("p");
      // p_qté.innerHTML = récupération_panier[i].quantité;
      div_cart_item_content_settings_quantity.appendChild(p_qté);

      // Création input class="itemQuantity"
      let input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("class", "itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", récupération_panier[i].quantité);
      div_cart_item_content_settings_quantity.appendChild(input);

      // Création div "cart__item__content__settings__delete"
      let div_cart_item_content_settings_delete = document.createElement("div");
      div_cart_item_content_settings_delete.setAttribute("class", "cart_item_content_settings_delete");
      article.appendChild(div_cart_item_content_settings_delete);

      // Création p "deleteItem"
      let p_delete = document.createElement("p");
      p_delete.setAttribute("class", "deleteItem");
      div_cart_item_content_settings_delete.appendChild(p_delete);

      let texte_p_delete = document.createTextNode("Supprimer");
      p_delete.appendChild(texte_p_delete);

      // ------------------
      // CHANGEMENT QUANTITÉ
      // écoute input
      input.addEventListener("change", change_quantity);
      function change_quantity() {
        let new_quantity = input.value;

        //récupération des inputs de chaque canap
        let input_parent = this.closest("article");
        let id_qté_modifiée = input_parent.dataset.id;
        let id_couleur_modifée = input_parent.dataset.color;
        //.find() pour trouver objet mm id et mm couleur dans LS (récupération_panier)
        let récupération_panier = JSON.parse(localStorage.getItem("choix_client"));
        let trouver_mm_idEtCouleur = récupération_panier.find((el) => {
          if (el.id == id_qté_modifiée && el.couleur == id_couleur_modifée) {
            let objet_trouvé = el;

            //.findIndex() pour trouver index de l'objet trouvé dans LS (récupération_panier)
            let index_trouvé = récupération_panier.findIndex((el) => el === objet_trouvé);

            //Récup de l'index dans panier
            let récup_index_panier = récupération_panier[index_trouvé];
            //modif de la quantité dans l'objet indexé
            let nouvelle_quantité_panier = (récup_index_panier.quantité = new_quantity);
            p_qté.innerText = nouvelle_quantité_panier;
            console.log(nouvelle_quantité_panier);
            // nouveau panier avec qté modifiée
            let nouveau_panier_qté_modif = récupération_panier;

            let nouveau_panier_dans_LS = localStorage.setItem("choix_client", JSON.stringify(nouveau_panier_qté_modif));
            location.reload();
          }
        });
      }

      //SUPPRIMER PRODUIT
      let récup_supp = document.getElementsByClassName("deleteItem");
      p_delete.addEventListener("click", supprimer_produit);
      p_delete.style.cursor = "pointer";
      function supprimer_produit() {
        let parent_supprimer = this.closest("article");
        let dataset_id_suppression = parent_supprimer.dataset.id;
        let dataset_couleur_suppression = parent_supprimer.dataset.color;
        //.find() pour trouver objet mm id et mm couleur pour supprimer dans LS (récupération_panier)
        let trouver_suppression_mm_idEtCouleur = récupération_panier.find((el) => {
          if (el.id == dataset_id_suppression && el.couleur == dataset_couleur_suppression) {
            let objet_àsupprimer_trouvé = el;

            // .findIndex() pour trouver index de l'objet trouvé dans LS (récupération_panier)
            let index_àsupprimer_trouvé = récupération_panier.findIndex((el) => el === objet_àsupprimer_trouvé);

            // Récup de l'index dans panier
            let index_suppression_panier = récupération_panier.splice(index_àsupprimer_trouvé, 1);

            let nouveau_panier_après_suppression = récupération_panier;

            let nouveau_LS_après_suppression = localStorage.setItem("choix_client", JSON.stringify(nouveau_panier_après_suppression));
            location.reload();
          }
        });
      }
    });
}

// -----------------------------
///FORMULAIRE
//récupération des éléments du formulaire
let formulaire = document.querySelector(".cart__order__form");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let order = document.getElementById("order");

// les Regex
let regex_champs = /^[-a-zA-Z'\séèàùçöäë]+$/;
let regex_address = /^[-a-zA-Z-0-9',\séèàùçöäë]+$/;
let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//pour prénom

firstName.addEventListener("input", firstName_control);
function firstName_control() {
  let firstName_value = firstName.value.trim();
  let mess_err_firstName = document.getElementById("firstNameErrorMsg");
  if (regex_champs.test(firstName_value) == false || firstName == "" || firstName_value.length < 2) {
    mess_err_firstName.innerHTML = "Seuls les minuscules, majuscules, tirets et apostrophes sont autorisés. ";
    firstName.style.backgroundColor = "LightCoral";
    return false;
  } else {
    mess_err_firstName.innerHTML = "Champ validé!";
    firstName.style.backgroundColor = "white";
    return true;
  }
}

// pour nom
lastName.addEventListener("input", lastName_control);
function lastName_control() {
  let lastName_value = lastName.value.trim();
  let mess_err_lastName = document.getElementById("lastNameErrorMsg");
  if (regex_champs.test(lastName_value) == false || lastName_value == "" || lastName_value.length < 2) {
    mess_err_lastName.innerHTML = "Seuls les minuscules, majuscules, tirets et apostrophes sont autorisés. ";
    lastName.style.backgroundColor = "LightCoral";
    return false;
  } else {
    mess_err_lastName.innerHTML = "Champ validé!";
    lastName.style.backgroundColor = "white";
    return true;
  }
}
//pour address
address.addEventListener("input", address_control);

function address_control() {
  let address_value = address.value.trim();
  let mess_err_address = document.getElementById("addressErrorMsg");
  if (regex_address.test(address_value) == false || address_value == "" || address_value.length < 2) {
    mess_err_address.innerHTML = "Les seuls champs autorisés sont : (a-z) (A-Z) (0-9) (-,.') (éèçà&öù)";
    address.style.backgroundColor = "LightCoral";
    return false;
  } else {
    mess_err_address.innerHTML = "Champ validé!";
    address.style.backgroundColor = "white";
    return true;
  }
}

//pour city
city.addEventListener("input", city_control);

function city_control () {
  let city_value = city.value.trim();
  let mess_err_city = document.getElementById("cityErrorMsg");
  if (regex_champs.test(city_value) == false || city_value == "" || city_value.length < 2) {
    mess_err_city.innerHTML = "Seuls les minuscules, majuscules, tirets et apostrophes sont autorisés. ";
    city.style.backgroundColor = "LightCoral";
    return false;
  } else {
    mess_err_city.innerHTML = "Champ validé!";
    city.style.backgroundColor = "white";
    return true
  }
}

//pour e-mail
email.addEventListener("input", email_control);

function email_control() {
  let email_value = email.value.trim();
  let mess_err_email = document.getElementById("emailErrorMsg");
  if (regex_email.test(email_value) == false) {
    mess_err_email.innerHTML = "Adresse e-mail non valide, veuillez vérifier votre adresse, SVP!";
    email.style.backgroundColor = "LightCoral";
    return false;
  } else {
    mess_err_email.innerHTML = "Champ validé!";
    email.style.backgroundColor = "white";
    return true;
  }
}
  
 

//pour envoi du form
formulaire.addEventListener("submit", form_valid);

function form_valid(e){
  e.preventDefault();
  if (!(firstName_control() && lastName_control() && address_control() && city_control() && email_control()))

  {
    alert("Veuillez vérifier que tous les champs soient bien valides, SVP!");
  }
  else
  {
    // Création objet contact pour envoi vers l'API
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };

    //Création objet products pour envoi vers l'API
    let products = récupération_panier.map((el) => el.id);

    //   //Création objet order (contact+products) pour envoi vers l'API
    let order = {
      contact: contact,
      products: products,
    };
    //   //envoi de order vers l'API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        let order_id = data.orderId;
        console.log(order_id);
        window.location.href = "http://127.0.0.1:5500/front/html/confirmation.html?id=" + data.orderId;
      })
      .catch((err) => alert(err));
  }
}

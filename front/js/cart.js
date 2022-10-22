let récupération_panier = JSON.parse(localStorage.getItem("choix_client"));
console.log(récupération_panier);

//boucle récupération des ID du panier
for (let i in récupération_panier) {
  let index_id = récupération_panier[i].id;
  console.log(index_id);

  fetch("http://localhost:3000/api/products/" + index_id)
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
      console.log(récupération_panier[i].id);

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
      article.appendChild(div_cart_item_content_settings_quantity);

      // création P/quantité de  "cart__item__content__settings__quantity"
      let p_qté = document.createElement("p");
      p_qté.innerHTML = récupération_panier[i].quantité;
      div_cart_item_content_settings_quantity.appendChild(p_qté);

      // Création input class="itemQuantity"
      let input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("class", "itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", "42");
      div_cart_item_content_settings_quantity.appendChild(input);

      // Création div "cart__item__content__settings__delete"
      let div_cart_item_content_settings_delete = document.createElement("div");
      div_cart_item_content_settings_delete.setAttribute("class", "div_cart_item_content_settings_delete");
      article.appendChild(div_cart_item_content_settings_delete);

      // Création p "deleteItem"
      let p_delete = document.createElement("p");
      p_delete.setAttribute("class", "deleteItem");
      div_cart_item_content_settings_delete.appendChild(p_delete);

      let texte_p_delete = document.createTextNode("Supprimer");
      p_delete.appendChild(texte_p_delete);

      //CHANGEMENT QUANTITÉ
      //écoute input
      // input.addEventListener("change", change_quantity);
      // function change_quantity() {
      //   let new_quantity = input.value;
      //   console.log(new_quantity);
      //   //récupération des inputs de chaque canap
      //   let input_parent = this.closest("article");
      //   let id_qté_modifiée = input_parent.dataset.id;
      //   console.log(id_qté_modifiée);
      //   let id_couleur_modifée = input_parent.dataset.color;
      //   console.log(id_couleur_modifée);

      //   //.find() pour trouver objet mm id et mm couleur dans LS (récupération_panier)
      //   let trouver_mm_idEtCouleur = récupération_panier.find((el) => {
      //     if (el.id == id_qté_modifiée && el.couleur == id_couleur_modifée) {
      //       let objet_trouvé = el;
      //       console.log(objet_trouvé);
      //       //.findIndex() pour trouver index de l'objet trouvé dans LS (récupération_panier)
      //       let index_trouvé = récupération_panier.findIndex((el) => el === objet_trouvé);
      //       console.log(index_trouvé);
      //       //Récup de l'index dans panier
      //       let récup_index_panier = récupération_panier[index_trouvé];
      //       //modif de la quantité dans l'objet/index
      //       let nouvelle_quantité_panier = (récup_index_panier.quantité = new_quantity);
      //       console.log(nouvelle_quantité_panier);
      //       // nouveau panier avec qté modifiée
      //       console.log(récupération_panier);
      //       let nouveau_panier _qté_modif= récupération_panier;
      //       console.log(nouveau_panier);
      //       let nouveau_panier_dans_LS = localStorage.setItem("panier_qté_modifiée", JSON.stringify(nouveau_panier _qté_modif));
      //     }
      //   });
      // }

      //SUPPRIMER PRODUIT
       let récup_supp =  document.getElementsByClassName("deleteItem");
      p_delete.addEventListener("click", supprimer_produit);
      p_delete.style.cursor = "pointer";
      function supprimer_produit () {
        let parent_supprimer = this.closest("article");
        let dataset_id_suppression = parent_supprimer .dataset.id;
        let dataset_couleur_suppression = parent_supprimer .dataset.color;
        //.find() pour trouver objet mm id et mm couleur pour supprimer dans LS (récupération_panier)
        let trouver_suppression_mm_idEtCouleur = récupération_panier.find((el) => {
          if (el.id == dataset_id_suppression && el.couleur == dataset_couleur_suppression) {
            let objet_àsupprimer_trouvé = el;
            console.log(objet_àsupprimer_trouvé);
            // .findIndex() pour trouver index de l'objet trouvé dans LS (récupération_panier)
            let index_àsupprimer_trouvé = récupération_panier.findIndex((el) => el === objet_àsupprimer_trouvé);
            console.log(index_àsupprimer_trouvé);
            // Récup de l'index dans panier
            let index_suppression_panier = récupération_panier.splice(index_àsupprimer_trouvé, 1);
            console.log(index_suppression_panier);
            let nouveau_panier_après_suppression = récupération_panier;
            console.log(nouveau_panier_après_suppression);
   let nouveau_LS_après_suppression =  localStorage.setItem("suppression-produit", JSON.stringify(nouveau_panier_après_suppression));
          }
        });
      }




      //FORMULAIRE
      //récupération des éléments du formulaire
      let formulaire = document.querySelector(".cart__order__form");
      let firstName = document.getElementById("firstName");
      let lastName = document.getElementById("lastName");
      let address = document.getElementById("address");
      let city = document.getElementById("city");
      let email = document.getElementById("email");
      let order = document.getElementById("order");

      //écoute du bouton "commander"
      formulaire.addEventListener("submit", form_valid);

      //fonction au submit du formulaire:
      function form_valid(e) {
        e.preventDefault();
        let regex_champs = /^[a-zA-Z -,.']+$/;
        let regex_address = /^[a-zA-Z0-9 -,.']+$/;
        let regex_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //pour nom
        let firstName_value = firstName.value.trim();
        let mess_err_firstName = document.getElementById("firstNameErrorMsg");
        if (regex_champs.test(firstName_value) == false) {
          mess_err_firstName.innerHTML = "Les caractères autorisés sont les minuscules, majuscules et - ,  . '  ";
        } else if ((firstName_value = "" || firstName_value.length < 2)) {
          mess_err_firstName.innerHTML = "Ce champ doit être rempli et contenir au minimum 2 caractères.";
        } else {
          mess_err_firstName.innerHTML = "Champ validé!";
        }
        //pour prénom
        let lastName_value = lastName.value.trim();
        let mess_err_lastName = document.getElementById("lastNameErrorMsg");
        if (regex_champs.test(lastName_value) == false) {
          mess_err_lastName.innerHTML = "Veuillez saisir uniquement des minuscules, des majuscules et des tirets, SVP.";
        } else if ((lastName_value = "" || lastName_value.length < 2)) {
          mess_err_lastName.innerHTML = "Ce champ doit être rempli et contenir au minimum 2 caractères.";
        } else {
          mess_err_lastName.innerHTML = "Champ validé!";
        }
        //pour address
        let address_value = address.value.trim();
        let mess_err_address = document.getElementById("addressErrorMsg");
        if (regex_address.test(address_value) == false) {
          mess_err_address.innerHTML = "Veuillez saisir uniquement des minuscules, des majuscules et des tirets, SVP.";
        } else if ((address_value = "" || address_value.length < 2)) {
          mess_err_address.innerHTML = "Ce champ doit être rempli et contenir au minimum 2 caractères.";
        } else {
          mess_err_address.innerHTML = "Champ validé!";
        }

        //pour city
        let city_value = city.value.trim();
        let mess_err_city = document.getElementById("cityErrorMsg");
        if (regex_champs.test(city_value) == false) {
          mess_err_city.innerHTML = "Veuillez saisir uniquement des minuscules, des majuscules et des tirets, SVP.";
        } else if ((city_value = "" || city_value.length < 2)) {
          mess_err_city.innerHTML = "Ce champ doit être rempli et contenir au minimum 2 caractères.";
        } else {
          mess_err_city.innerHTML = "Champ validé!";
        }

        //pour e-mail
        let email_value = email.value.trim();
        let mess_err_email = document.getElementById("emailErrorMsg");
        if (regex_email.test(email_value) == false) {
          mess_err_email.innerHTML = "Adresse e-mail non valide, veuillez vérifier votre adresse, SVP!";
        } else {
          mess_err_email.innerHTML = "Champ validé!";
        }
      }
    });
}

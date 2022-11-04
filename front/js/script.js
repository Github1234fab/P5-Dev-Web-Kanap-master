fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    let section_canape = document.getElementById("items");
    section_canape.className = "items";

    let lien_canape;
    let image_canape;
    let nom_canape;
    let description_canape;
    let article = document.getElementsByTagName("article");

    for (let i = 0; i < data.length; i++) {
      // Affiche lien Canapé
      lien_canape = document.createElement("a");
      lien_canape.setAttribute("href", "./product.html?id=" + data[i]._id);
      // lien_canape.textContent = data[i]._id;
      section_canape.appendChild(lien_canape);

      let article = document.createElement("Article");
      lien_canape.appendChild(article);

      // Affiche image Canapé
      image_canape = document.createElement("img");
      image_canape.src = data[i].imageUrl;
      image_canape.setAttribute("alt", data[i].altTxt);
      article.appendChild(image_canape);

      // Affiche nom Canapé h3
      nom_canape = document.createElement("h3");
      nom_canape.textContent = data[i].name;
      nom_canape.setAttribute("class", "productName");
      article.appendChild(nom_canape);

      // Affiche Description Canapé
      description_canape = document.createElement("p");
      description_canape.textContent = data[i].description;
      description_canape.setAttribute("class", "productDescription");
      article.appendChild(description_canape);
    }
  });

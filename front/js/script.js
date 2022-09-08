// fetch("http://localhost:3000/api/products")
// .then(reponse => console.log(reponse))

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    let section_canape = document.getElementById("items");
    let nom_canape;
    let image_canape;
    let price_canape;
    let texte_canape;
    let description_canape;
    let id_canape;
    let colors_canape;

    for (let i = 0; i < data.length; i++) {

      // Affiche nom Canapé
      nom_canape = document.createElement("h3");
      nom_canape.textContent = data[i].name;
      section_canape.appendChild(nom_canape);

      // Affiche image Canapé
      image_canape = document.createElement("img");
      image_canape.innerText = data[i].imageUrl;
      section_canape.appendChild(image_canape);

      // Affiche Prix Canapé
      price_canape = document.createElement("h3");
      price_canape.textContent = data[i].price;
      section_canape.appendChild(price_canape);

      // Affiche Texte Canapé
      texte_canape = document.createElement("h3");
      texte_canape.textContent = data[i].altTxt;
      section_canape.appendChild(texte_canape);

      // Affiche Description Canapé
      description_canape = document.createElement("h3");
      description_canape.textContent = data[i].description;
      section_canape.appendChild(description_canape);

      // Affiche ID Canapé
      id_canape = document.createElement("h3");
      id_canape.textContent = data[i]._id;
      section_canape.appendChild(id_canape);

        // Affiche colors Canapé
        colors_canape = document.createElement("h3");
        colors_canape.textContent = data[i].colors;
        section_canape.appendChild(colors_canape);
    }

    console.log(data);
  });

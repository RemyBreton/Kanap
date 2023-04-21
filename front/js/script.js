/***************************************************************************/
/******************* RECUPERATION DES DONNEES DE L'API *******************/
/***********************************************************************/

fetch(/*"http://localhost:3000/api/products"*/"https://kanapi.gtnsimon.dev/api/products") // fetch fonction de chrome pour recuperer les données de l'api
  .then((res) => res.json())
  .then((data) => addProducts(data)); // recherche de la fonction addProducts

/**************************************************************/
/******************* CREATION DES ARTICLES *******************/
/************************************************************/

function addProducts(kanaps) {
  // recuperation des donnees des elements en créant une balise "a" constituer d'un article, une image, un h3 et un p

  kanaps.forEach((kanap) => {
    // pour chaque element reiteration de la fonction

    const { _id, imageUrl, altTxt, name, description } = kanap; // recuperation de l'object pour chaque element
    const anchor = makeAnchor(_id);
    const article = document.createElement("article"); // creation de la balise "article"
    const image = makeImage(imageUrl, altTxt);
    const h3 = makeH3(name);
    const p = makeP(description);

    addElementsToArticle(article, image, h3, p); // ajout à l'article des elements: "img", "h3" et "p"
    addArticleToAnchor(anchor, article); // ajout de l'article a la balise "a"
  });
}

function addElementsToArticle(article, image, h3, p) {
  // function qui ajoutera des enfants à notre "article"
  article.appendChild(image);
  article.appendChild(h3); 
  article.appendChild(p);
}

function makeAnchor(id) {
  // creation de la balise "a" avec le liens de redirection
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id; // redirection vers la page product tout en ajoutant le parametre de l'id du produit a l'url
  return anchor;
}

function addArticleToAnchor(anchor, article) {
  // ajout de l'article dans la balise "a"
  const items = document.querySelector("#items");
  if (items != null) {
    // si l'items est different de nul appendchild
    items.appendChild(anchor); // anchor enfant d'items
    anchor.appendChild(article); // article enfant d'anchor
  }
}

function makeImage(imageUrl, altTxt) {
  // creation de la balise "image"
  const image = document.createElement("img"); 
  image.src = imageUrl; // pour dire que la source de l'image est egale à imageUrl de l'api
  image.alt = altTxt; // pour dire que la description de l'image est egale à altTxt de l'api
  return image;
}

function makeH3(name) {
  // creation de la balise "h3"
  const h3 = document.createElement("h3"); 
  h3.textContent = name;  // pour que le contenu du titre soit egale au nom du produit dans l'api
  h3.classList.add("productName");
  return h3;
}

function makeP(description) {
  // creation de la balise "p"
  const p = document.createElement("p"); 
  p.textContent = description; // pour que le contenu du texte soit egale à description de l'api
  p.classList.add("productDescription");
  return p;
}


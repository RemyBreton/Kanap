const cart = []; // variable pour recuperation des valeurs du cache

searchArticleFromCache(); // appel de la fonction
cart.forEach((item) => displayItem(item)); // pour chaque item faire displayItem

function searchArticleFromCache() { 
  // recuperation des item du cache pour en faire des objects
  const numberOfArticle = localStorage.length
  for (let i = 0; i < numberOfArticle; i++) { 
    const item = localStorage.getItem(localStorage.key("article")) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
}

function displayItem(item) {
  // creation de l'item en html
  const article = makeArticle(item); // creation de l' article
  const imageDiv = makeImageDiv(item); // creation de la div pour l'image
  article.appendChild(imageDiv); // ajout de l'enfant div au parent article

  const cardItemContent = makeCartContent(item); // creation du contenu de la description de l'item en l'occurence le h2 et les deux p
  article.appendChild(cardItemContent); // ajout du contenu du content au parent article

  displayArticle(article); // montre l'article

  displayTotalQuantity(item) // montre l'item
}

function displayTotalQuantity(item) { // function qui dira que le contenu de l'id totalQuantity sera egale à la quantité du panier
  const totalQuantity = document.querySelector("#totalQuantity")  // recherche de l'id totalQuantity
  totalQuantity.textContent = item.quantity
}

function makeCartContent(item) {
  // ajout de la description et du settings au content
  const cardItemContent = document.createElement("div"); // creation de la div content
  cardItemContent.classList.add("cart__item__content"); // ajout de la class

  const description = makeDescription(item);
  const settings = makeSettings(item);

  cardItemContent.appendChild(description); // ajout de l'enfant description au parent carditemcontent
  cardItemContent.appendChild(settings); // ajout de l'enfant settings au parent carditemcontent
  return cardItemContent;
}

function makeSettings(item) {
  // creation de la div settings
  const settings = document.createElement("div"); // creation de la div
  settings.classList.add("cart__item__content__settings"); // ajout de la class

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings)
  return settings
}

function addDeleteToSettings(settings, item) { // ajout de la fonction de suppression d'un article dans le panier
 const div = document.createElement("div") // creation d'une div
 div.classList.add("cart__item__content__settings__delete") // ajout de la class "cart__item__content__settings__delete"
 const p = document.createElement("p")  // creation de la balise p
 p.textContent = "Supprimer"  // contenu de la balise p
 div.appendChild(p) // ajout de l'enfant p au parent div
 settings.appendChild(div) // ajout de la div au parent 
}

function addQuantityToSettings(settings, item) { // ajout des parametre pour changer la quantité de l'item dans le panier
  const quantity = document.createElement("div"); // creation d'une div
  quantity.classList.add("cart__item__content__settings__quantity");  // ajout d'une class à la div
  const p = document.createElement("p");  // creation de la balise p
  p.textContent = "Qté : "; // contenu de la balise p
  quantity.appendChild(p); // ajout de l'enfant p au parent quantity
  const input = document.createElement("input");  // creation de l'input
  input.type = "number";  // defini le type du input
  input.classList.add("itemQuantity");  // ajout d'une class au input
  input.name = "itemQuantity";  // defini le nom du input
  input.min = "1";  // valeur mini du input
  input.max = "100";  // valeur max du input
  input.value = item.quantity;  // input sera egale à la quantité

  quantity.appendChild(input);  // ajout de l'enfant input au parent quantity
  settings.appendChild(quantity) // ajout de l'enfant quantity au parent settings
}

function makeDescription(item) { // creation de la description de l'item
  const description = document.createElement("div"); // creation de la div
  description.classList.add("cart__item__content__description"); // ajout de la class à la div

  const h2 = document.createElement("h2"); // creation de la balise h2
  h2.textContent = item.name; // contenu du h2 par rapport au name du localstorage
  const p = document.createElement("p"); // creation de la balise p
  p.textContent = item.color; // contenu du p par rapport à couleur dans le localstorage
  const p2 = document.createElement("p"); // creation de la balise p
  p2.textContent = item.price + " €"; // contenu du p par rapport à price dans le localstorage + ajout du signe euro

  description.appendChild(h2); // ajout des enfants à description
  description.appendChild(p);
  description.appendChild(p2);
  return description; // renvoi de la description
}
function displayArticle(article) {
  // affichage de l'article
  document.querySelector("#cart__items").appendChild(article); // ajout de l'article à l'id #cart__items
}

function makeArticle(item) {
  // creation de l'article
  const article = document.createElement("article"); // création de l'article en question
  article.classList.add("cart__item"); // ajout de la class a l'article
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

function makeImageDiv(item) {
  // creation de la balise image dans une div
  const div = document.createElement("div"); // création de la div en question
  div.classList.add("cart__item__img"); // ajout de la class

  const image = document.createElement("img"); // creation de la balise image en question
  image.src = item.imageUrl; // src de l'image sera egale à imageUrl du localStorage
  image.alt = item.altTxt;
  div.appendChild(image); // ajout de la balise image à la div
  return div;
}

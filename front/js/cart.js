searchArticleFromCache() // appel de la fonction

/*altTxt: "Photo d'un canapé bleu, deux places";
color: "White";
id: "107fb5b75607497b96722bda5b504926";
imageUrl: "http://localhost:3000/images/kanap01.jpeg";
name: "Kanap Sinopé";
price: 1849;
quantity: 1;*/

function searchArticleFromCache() {
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  if (produitInLc == null) {
    alert("votre panier est vide");
  } else {
    for (valeur of produitInLc) {
      displayItem(valeur)
    }
  }
}

function displayItem(valeur) {
  const article = makeArticle(valeur)
  const imageDiv = makeImageDiv(valeur)
  article.appendChild(imageDiv)

  const cardItemContent = makeCartContent(valeur)
  article.appendChild(cardItemContent)

  displayArticle(article)
  displayTotalQuantity()
  displayTotalPrice()
}

function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  let total = 0;
  for(let valeur of produitInLc){
    total += valeur.quantity * valeur.price
  }
  totalPrice.textContent = total
  return total
 
}

function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  let number = 0;
  for(let valeur of produitInLc){
    number += valeur.quantity
  }
  totalQuantity.textContent = number 
  return number
 
}

function makeCartContent(valeur) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(valeur)
  const settings = makeSettings(valeur)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}

function makeSettings(valeur){
const settings = document.createElement("div")
settings.classList.add("cart__item__content__settings")

addQuantityToSettings(settings, valeur)
addDeleteToSettings(settings);
return settings
}

function addDeleteToSettings(settings) {
  const div = document.createElement("div"); 
  div.classList.add("cart__item__content__settings__delete"); 
  const p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div); 
}

function addQuantityToSettings(settings, valeur) {
  const quantity = document.createElement("div"); 
  quantity.classList.add("cart__item__content__settings__quantity"); 
  const p = document.createElement("p"); 
  p.textContent = "Qté : "; 
  quantity.appendChild(p);
  const input = document.createElement("input"); 
  input.type = "number"; 
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100"; 
  input.value = valeur.quantity; 
  input.addEventListener("input", () =>
    changeQuantity(input, valeur)
  )

  quantity.appendChild(input)
  settings.appendChild(quantity)
}
//-------------------------------------------------


/*function saveCart(basket) { //sauvegarde dans le du panier dans le localstorage
  localStorage.setItem("basket", JSON.stringify(basket)); // stringify pour transformer l'objet en chaine de caractere
}*/

/*function getCart() { // recuperation du panier dans le localstorage
  let basket = localStorage.getItem("basket");
  if(basket == null) { // si basket est null alors retourne un tableau vide
    return []
  }else{
    return JSON.parse(basket) // parse pour transformer l'objet en chaine de caractere 

  }
}*/
function removeFromCart(input, valeur) {
 // let basket = getCart();
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  basket = produitInLc.filter(p => p.id != valeur.id && p.color == valeur.color);
  localStorage.setItem("basket", JSON.stringify(produitInLc)); // stringify pour transformer l'objet en chaine de caractere
}

function changeQuantity(input, valeur) {
  // let basket = getCart();
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  let foundProduct = produitInLc.find(p => p.id == valeur.id && p.color == valeur.color)
  if (foundProduct != undefined) {
    foundProduct.quantity = Number(input.value)
    if(foundProduct.quantity <= 0){
      removeFromCart(foundProduct)
    } else {
      localStorage.setItem("basket", JSON.stringify(produitInLc)); // stringify pour transformer l'objet en chaine de caractere
    }
  }
  displayTotalQuantity()
  displayTotalPrice()
}


//--------------------------------------------------
function makeDescription(valeur) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")
  const h2 = document.createElement("h2")
  h2.textContent = valeur.name
  const p = document.createElement("p")
  p.textContent = valeur.color
  const p2 = document.createElement("p")
  p2.textContent = valeur.price + " €"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(valeur){
  const article = document.createElement('article')
  article.classList.add("cart__item")
  article.dataset.id = valeur.id
  article.dataset.color = valeur.color
  return article
}

function makeImageDiv(valeur) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement('img')
  image.src = valeur.imageUrl
  image.alt = valeur.altTxt
  div.appendChild(image)
  return div
}


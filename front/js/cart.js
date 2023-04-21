searchArticleFromCache(); // appel de la fonction

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

/*altTxt: "Photo d'un canapé bleu, deux places";
color: "White";
id: "107fb5b75607497b96722bda5b504926";
imageUrl: "http://localhost:3000/images/kanap01.jpeg";
name: "Kanap Sinopé";
price: 1849;
quantity: 1;*/

/**************************************************************/
/******************** RECHERCHE DANS LE LC *******************/
/************************************************************/

function searchArticleFromCache() {
  // function qui nous permettre de créer l'article en recherchant les valeurs des produit dans LC "basket"
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  if (produitInLc == null || produitInLc.length == 0) {
    // si produit est null ou si aucune valeur dans le tableau alors une alerte s'affichera
    alert("Your cart is empty");
  } else {
    // sinon appel de la function
    for (valeur of produitInLc) {
      displayItem(valeur);
    }
  }
}

function displayItem(valeur) {
  // function qui va venir ajouter les enfants aux parents article
  const article = makeArticle(valeur);
  const imageDiv = makeImageDiv(valeur);
  article.appendChild(imageDiv);

  const cardItemContent = makeCartContent(valeur);
  article.appendChild(cardItemContent);

  displayArticle(article);
  displayTotalQuantity();
  displayTotalPrice();
}

/**************************************************************/
/*************** CALCULE TOTAL QUANTITY + PRIX ***************/
/************************************************************/

function displayTotalPrice() {
  // function qui va venir calculer le prix total par rapport aux prix et la quantité des produits dans le LC
  const totalPrice = document.querySelector("#totalPrice");
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  let total = 0;
  for (let valeur of produitInLc) {
    total += valeur.quantity * valeur.price;
  }
  totalPrice.textContent = total;
  return total;
}

/**************************************************************/
/******************* CREATION DES ARTICLES *******************/
/************************************************************/

function displayTotalQuantity() {
  // function qui va calculer la quantité total par rapport aux quantité des produits dans le LC
  const totalQuantity = document.querySelector("#totalQuantity");
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  let number = 0;
  for (let valeur of produitInLc) {
    number += valeur.quantity;
  }
  totalQuantity.textContent = number;
  return number;
}

function makeCartContent(valeur) {
  // function qui va créer la div contenant la description et les settings
  const cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");

  const description = makeDescription(valeur);
  const settings = makeSettings(valeur);

  cardItemContent.appendChild(description);
  cardItemContent.appendChild(settings);
  return cardItemContent;
}

function makeSettings(valeur) {
  // function qui va créer la div contenant les settings (bouton delete et input pour la quantité)
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSettings(settings, valeur);
  addDeleteToSettings(settings, valeur);
  return settings;
}

function addDeleteToSettings(settings, valeur) {
  // function qui va venir créer le bouton supprimer ainsi que son evenement voir removeFromCart
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");

  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";
  p.addEventListener("click", () => removeFromCart(valeur));
  div.appendChild(p);
  settings.appendChild(div);
}

function addQuantityToSettings(settings, valeur) {
  // function qui va venir cree le input en lui donnant pour valeur d'origine la quantité du produit dans le LC
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
  input.addEventListener("input", () => changeQuantity(input, valeur));

  quantity.appendChild(input);
  settings.appendChild(quantity);
}

function removeFromCart(valeur) {
  // function qui va nous permettre de supprimer le produit du LC avec une fenêtre de confirmation
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  let ValidationDelete = confirm(
    "Are you sure you want to remove the product from your cart?"
  );
  if (ValidationDelete === true) {
    produitInLc = produitInLc.filter(
      (p) =>
        (p.id !== valeur.id && p.color !== valeur.color) ||
        (p.id == valeur.id && p.color != valeur.color)
    );
    localStorage.setItem("basket", JSON.stringify(produitInLc));
    displayTotalPrice();
    displayTotalQuantity();
    deleteArticleFromPAge(valeur);
    alert("Your cart has been successfully modified");
  } else {
    alert("Your cart is unchanged");
  }
}

function deleteArticleFromPAge(valeur) {
  // function qui va nous permettre de supprimer l'article de la page quand le produit passe à 0
  const articleToDelete = document.querySelector(
    `article[data-id="${valeur.id}"][data-color="${valeur.color}"]`
  );
  articleToDelete.remove();
}

function changeQuantity(input, valeur) {
  // function qui va permettre de modifier la quantité d'un produit dans le panier tout en mettant le prix total et la quantité à jour
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  let foundProduct = produitInLc.find(
    (p) => p.id == valeur.id && p.color == valeur.color
  );
  if (foundProduct != undefined) {
    foundProduct.quantity = Number(input.value);
    if (foundProduct.quantity <= 0) {
      removeFromCart(valeur);
    } else {
      localStorage.setItem("basket", JSON.stringify(produitInLc)); // stringify pour transformer l'objet en chaine de caractere
    }
  }
  displayTotalQuantity();
  displayTotalPrice();
}

function makeDescription(valeur) {
  // function qui va venir créer une div contenant les enfants h2, p, p ainsi que leurs valeurs
  // exemple h2 va recuperer le name dans le local storage du produit afain d'obtenir sa valeur
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  const h2 = document.createElement("h2");
  h2.textContent = valeur.name;
  const p = document.createElement("p");
  p.textContent = valeur.color;
  const p2 = document.createElement("p");
  p2.textContent = valeur.price + " €";

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}

function displayArticle(article) {
  // function qui va venir ajouter l'article enfant à son parent qui à l'id #cart__items
  document.querySelector("#cart__items").appendChild(article);
}

function makeArticle(valeur) {
  // function qui viendra crée l'article
  // on viendra y recuperer la couleur et l'id du produit dans le LC
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = valeur.id;
  article.dataset.color = valeur.color;
  return article;
}

function makeImageDiv(valeur) {
  // function qui va venir cree une div qui contiendra une image
  // on viendra récuperer les valeurs de imageUrl et altTxt dans les données du LC
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.src = valeur.imageUrl;
  image.alt = valeur.altTxt;
  div.appendChild(image);
  return div;
}

//----------------------------------------------FORMULAIRE--------------------------------------------
//----------------------------------------------------------------------------------------------------

function submitForm(e) {
  // function qui renverra une erreur si le panier est vite
  // Ira push dans un array les valeurs id du local storage
  // pis utilisera un fetch POST pour obtenir un renvoi de promess et obtenir un order id pour le bon de commande final
  // enfin  redirigera vers la page confirmation
  e.preventDefault();
  let produitInLc = JSON.parse(localStorage.getItem("basket"));
  if (produitInLc.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let productId = [];
  for (data of produitInLc) {
    productId.push(data.id);
  }
  const body = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: [data.id],
  };
  formValid();
  if (
    isFormFirstNameInvalid() &&
    isFormNameInvalid() &&
    isFormAddressInvalid() &&
    isFormCityInvalid() &&
    isFormEmailInvalid()
  ) {
    fetch(/*"http://localhost:3000/api/products/order"*/"https://kanapi.gtnsimon.dev/api/products/order", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataUser) => {
        const orderId = dataUser.orderId;
        window.location.href = "./confirmation.html" + "?orderId=" + orderId;
      })
  }
}
//-------------------------------------ERREUR DE FORMULAIRE-------------------------------------------
//----------------------------------------------------------------------------------------------------

function isFormFirstNameInvalid() {
  // function qui renverra une erreur si l'un des inputs du formulaire n'a pas été rempli
  const theFirstName = document.querySelector("#firstName");
  const firstName = theFirstName.value;
  const errFirstName = document.querySelector("#firstNameErrorMsg");
  if (/^[A-Za-z]{3,20}$/.test(firstName)) {
    errFirstName.textContent = "";
    return true;
  } else if (firstName === "") {
    errFirstName.textContent = "Please enter your first name";
    return false;
  } else {
    errFirstName.textContent = "Please enter correct first name";
    return false;
  }
}

function isFormNameInvalid() {
  // function qui renverra une erreur si l'un des inputs du formulaire n'a pas été rempli
  const theLastName = document.querySelector("#lastName");
  const lastName = theLastName.value;
  const errLastName = document.querySelector("#lastNameErrorMsg");
  if (/^[A-Za-z]{3,20}$/.test(lastName)) {
    errLastName.textContent = "";
    return true;
  } else if (lastName === "") {
    errLastName.textContent = "Please enter your last name";
    return false;
  } else {
    errLastName.textContent = "Please enter correct last name";
    return false;
  }
}

function isFormAddressInvalid() {
  // function qui renverra une erreur si l'un des inputs du formulaire n'a pas été rempli
  const theAddress = document.querySelector("#address");
  const address = theAddress.value;
  const errAddress = document.querySelector("#addressErrorMsg");
  if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(address)) {
    errAddress.textContent = "";
    return true;
  } else {
    errAddress.textContent = "Please enter your address";
    return false;
  }
}

function isFormCityInvalid() {
  // function qui renverra une erreur si l'un des inputs du formulaire n'a pas été rempli
  const theCity = document.querySelector("#city");
  const city = theCity.value;
  const errCity = document.querySelector("#cityErrorMsg");
  if (/^[A-Za-z]{2,}$/.test(city)) {
    errCity.textContent = "";
    return true;
  } else if (city === "") {
    errCity.textContent = "Please enter your city";
    return false;
  } else {
    errCity.textContent = "Please enter correct city";
    return false;
  }
}

function isFormEmailInvalid() {
  // function qui renverra une erreur si l'adress mail ne contient pas d'@ et un . suivis de deux lettres ainsi que des caractères non autorisé
  const theEmail = document.querySelector("#email");
  const email = theEmail.value;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const errEmail = document.querySelector("#emailErrorMsg");
  if (regex.test(email)) {
    errEmail.textContent = "";
    return true;
  } else if (email === "") {
    errEmail.textContent = "Please enter valid email";
    return false;
  } else {
    errEmail.textContent = "Please enter correct email";
    return false;
  }
}

function formValid() {
  // appel des function pour un contenu plus propre
  isFormFirstNameInvalid();
  isFormNameInvalid();
  isFormAddressInvalid();
  isFormCityInvalid();
  isFormEmailInvalid();
}

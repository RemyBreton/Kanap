const queryString = window.location.search; // va nous permettre de prendre des informations par rapport à l'emplacement d'un document, Une DOMString contenant un '?' suivi des paramètres de l'URL.
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id"); // La get()méthode de l' URLSearchParams interface renvoie la première valeur associée au paramètre de recherche donné donc l'id de l'api.
if (productId != null) {
  // si l'id n'est pas null
  let itemPrice = 0;
  let imgUrl, altText, productName;
}

fetch(`http://localhost:3000/api/products/${productId}`) // fetch fonction de chrome pour recuperer les données de l'api
  .then((response) => response.json())
  .then((res) => handleData(res)); // recherche de la fonction handleData

function handleData(kanap) {
  // recuperation de l'object
  const { altTxt, imageUrl, colors, description, name, price } = kanap; // recuperation de l'object pour chaque element
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  itemPrice = price; // recuperera le prix dans l'api pour la coller sur la variable let itemPrice
  imgUrl = imageUrl;
  altText = altTxt;
  productName = name;
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makeImage(imageUrl, altTxt) {
  // creation de la balise "image"
  const image = document.createElement("img"); // creation de la balise "img"
  image.src = imageUrl; // pour dire que la source de l'image est egale à imageUrl de l'api
  image.alt = altTxt; // pour dire que la description de l'image est egale à altTxt de l'api
  const parent = document.querySelector(".item__img"); // selection de la destination en l'occurence la div avec pour class .item__img
  if (parent != null) parent.appendChild(image); // si parent est different de null alors on ajoute image
}

function makeTitle(name) {
  // creation du titre dans #title
  const h1 = document.querySelector("#title");
  if (title != null) h1.textContent = name; // si parent est different de null alors on ajoute le contenu dans #title
}

function makePrice(price) {
  // creation du prix dans #price
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price; // si parent est different de null alors on ajoute le contenu dans #price
}

function makeDescription(description) {
  // creation de la description dans #description
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description; // si parent est different de null alors on ajoute le contenu dans #description
}

function makeColors(colors) {
  // creation des options de couleur dans l'id #colors
  const choose = document.querySelector("#colors");
  if (choose != null) {
    // si parent est different de null alors on ajoute le contenu dans #colors
    colors.forEach((color) => {
      // pour chaque couleur creation d'une option
      const option = document.createElement("option");
      option.value = color; // option de valeur en l'occrrence les couleurs grace au valeur de l'object
      option.textContent = color;
      choose.appendChild(option); // ajout des enfants (option) à la balise d'id "colors"
    });
  }
}

const button = document.querySelector("#addToCart");
if (button != null) {
  // si la valeur est different de null récuperation des valeurs de couleur et de la quantité
  button.addEventListener("click", handleClick); // ajout de l'evenement au clique
}

function handleClick() {
  // récuperation des valeurs de couleur et de la quantité
  const color = document.querySelector("#colors").value; // recherche de la valeur de la couleur
  const quantity = document.querySelector("#quantity").value; // recherche de la valeur de la quantité
  if (itemOrderInvalid(color, quantity)) return;
  saveOrder(color, quantity);
  alert("your product has been successfully added"); // alert pour confirmation d'ajout au panier
}

function saveOrder(color, quantity) {
  // sauvegarde des order dans le localStorage
  const data = {
    id: productId, // id egale à productId
    name: productName, // name egale à name
    color: color, // color egale à color
    quantity: Number(quantity), // quantity egale à quantity ( en number et non en string )
    price: itemPrice, // price egale à itemPrice
    imageUrl: imgUrl, // imageUrl egale à imgUrl
    altTxt: altText, // altTxt egale à altText
  }

  //const itemPanier = localStorage.getItem("article");
  localStorage.setItem("article", JSON.stringify(data)); // transformera l'object en string
}

function itemOrderInvalid(color, quantity) {
  // message d'alert si la couleur est nul ou egale à la string par defaut "", si la quantité est nul ou egale à 0
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Please select a color and quantity");
    return true;
  }
  if (quantity > 100) { // message d'alert si quantité est superieur à 100
    alert("select a quantity between 1 and 100");
    return true;
  }
}

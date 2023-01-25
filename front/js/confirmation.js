const orderId = getOrderId();
displayOrderId(orderId);
removeCache();

function getOrderId() {
  // La get()méthode de l' URLSearchParams interface renvoie la première valeur associée au paramètre de recherche donné donc l'id de l'api.
  // va nous permettre de prendre des informations par rapport à l'emplacement d'un document, Une DOMString contenant un '?' suivi des paramètres de l'URL.
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

function displayOrderId(orderId) {
  // création de l'orderID quinous donnera le numero de commande
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}

function removeCache() {
  // suppression du panier dans le LC
  const cache = window.localStorage;
  cache.clear();
}

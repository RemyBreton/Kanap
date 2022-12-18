const queryString = window.location.search // va nous permettre de prendre des informations par rapport à l'emplacement d'un document, Une DOMString contenant un '?' suivi des paramètres de l'URL.
const urlParams = new URLSearchParams(queryString) 
const productId = urlParams.get("id") // La get()méthode de l' URLSearchParams interface renvoie la première valeur associée au paramètre de recherche donné donc l'id de l'api.

fetch(`http://localhost:3000/api/products/${productId}`) // fetch fonction de chrome pour recuperer les données de l'api
    .then((response) => response.json())
    .then((res) => handleData(res)) // recherche de la fonction handleData 

    function handleData(kanap) { // recuperation de l'object 
        const { altTxt, imageUrl, colors, description, name, price } = kanap // recuperation de l'object pour chaque element 
        makeImage(imageUrl, altTxt)
        makeTitle(name)
        makePrice(price)
        makeDescription(description)
        makeColors(colors)
    }

    function makeImage (imageUrl, altTxt) { // creation de la balise "image" 
        const image = document.createElement("img")  // creation de la balise "img"
        image.src = imageUrl    // pour dire que la source de l'image est egale à imageUrl de l'api
        image.alt = altTxt  // pour dire que la description de l'image est egale à altTxt de l'api
        const parent = document.querySelector(".item__img") // selection de la destination en l'occurence la div avec pour class .item__img
        if (parent != null) parent.appendChild(image) // si parent est different de null alors on ajoute image
    }

    function makeTitle(name) { // creation du titre dans #title
        const h1 = document.querySelector("#title")
        if (title != null) h1.textContent = name // si parent est different de null alors on ajoute le contenu dans #title
}

    function makePrice(price) { // creation du prix dans #price
        const span = document.querySelector("#price")
        if (span != null) span.textContent = price // si parent est different de null alors on ajoute le contenu dans #price
    }

    function makeDescription(description) { // creation de la description dans #description
        const p = document.querySelector("#description")
        if (p != null) p.textContent = description // si parent est different de null alors on ajoute le contenu dans #description
    }

    function makeColors(colors) {   // creation des options de couleurs dans l'id #colors
        const choose = document.querySelector("#colors")
        if (choose != null) { // si parent est different de null alors on ajoute le contenu dans #colors
            colors.forEach(color => {   // pour chaque couleur creation d'une option 
                const option = document.createElement("option")
                option.value = color // option de valeur en l'occrrence les couleurs grace au valeur de l'object
                option.textContent = color  
                choose.appendChild(option)  // ajout des enfants (option) a la balise d'id "colors"
            });
        }
    }
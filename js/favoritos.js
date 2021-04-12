// ---------------------------------HOME REDIRECT

document.querySelector("#goSearchBtn")
.addEventListener("click", goSearch)

function goSearch() {
    fetch("/")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------SHOW FAVS

function showFavs () {
    fetch("http://localhost:8080/favoritos", {
        headers: {
            'authorization': `Bearer: ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            data.data.map(el => printData(el))
        }
        if (data.status == 400){
            alert(data.data)
        }
        if (data.status == 403){
            alert(data.data)
            setTimeout(window.location.href = data.url, 1500)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

showFavs()

function printData(element) {
        // Creación de tarjeta en la que se almacenará cada oferta.
        let card = document.createElement("div")
        card.setAttribute("class", "ofert")
        container.appendChild(card)

        // Título de la oferta
        let title = document.createElement("a")
        title.setAttribute("class", "title").setAttribute("href",element.enlace).setAttribute("target", "_blank")
        title.innerText = element.titulo;
        card.appendChild(title)
        //  Descripción
        let description = document.createElement("p")
        title.setAttribute("class", "text");
        description.innerText = element.descripcion;
        card.appendChild(description)

        // SubContenedor
        let footerOfert = document.createElement("div")
        footerOfert.setAttribute("class", "footer-ofert")
        card.appendChild(footerOfert);

        let remuneración = document.createElement("h4")
        remuneración.setAttribute("id", "father").setAttribute("class","salary")
        remuneración.innerText = element.remuneracion
        footerOfert.appendChild(remuneración)

        let favBtn = document.createElement("button")
        favBtn.setAttribute("class","enterBTN")
        footerOfert.appendChild(favBtn)
        favBtn.addEventListener("click", () => {
            deleteFav(element.id)
        })        
        let estrella = document.createElement("img")
        estrella.setAttribute("src", "img/estrella.svg").setAttribute("class","searchBTN");
        favBtn.appendChild(estrella)
}

function deleteFav(favId) {
    fetch("http://localhost:8080/deleteFav", {
        method: 'DELETE',
        body: JSON.stringify( { id: favId } ),
        headers: {
            'Content-Type': "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.data)
            setTimeout(window.location.href = data.url, 1500)
        }
        if (data.status == 400){
            alert(data.data)
        }
        if (data.status == 500){
            alert(data.data)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ------------------------------------------LOGOUT

document.querySelector("#logoutBtn")
    .addEventListener("click", () => logout() )
    
function logout() {
    fetch("http://localhost:8080/logout", {
        method: 'PUT',
        headers: {
            'authorization': `Bearer: ${sessionStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.data)
            setTimeout(window.location.href = data.url, 1500)
        }
        if (data.status == 500){
            alert(data.data)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

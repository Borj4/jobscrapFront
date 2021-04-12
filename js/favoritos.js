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

        console.log(element);
        let card = document.createElement("div")
        card.setAttribute("class", "ofert")
        document.querySelector('#father').appendChild(card)

        // Título de la oferta
        let title = document.createElement("a")
        title.setAttribute("class", "title")
        title.setAttribute("href", element.enlace)
        title.setAttribute("target", "_blank")
        title.innerText = element.titulo;
        card.appendChild(title)

        //  Descripción
        let description = document.createElement("p")
        description.setAttribute("class", "text");
        description.innerText = element.descripcion;
        card.appendChild(description)

        // // SubContenedor
        let footerOfert = document.createElement("div")
        footerOfert.setAttribute("class", "footer-ofert")
        card.appendChild(footerOfert);

        let money = document.createElement("h4")
        money.setAttribute("class","remuneracion")
        money.innerText = element.remuneracion
        footerOfert.appendChild(money)

        let favBtn = document.createElement("button")
        favBtn.setAttribute("class","enterBTN")
        footerOfert.appendChild(favBtn)
        favBtn.addEventListener("click", () => {
            deleteFav(element.id)
        })        
        let star = document.createElement("img")
        star.setAttribute("src", "img/estrella.svg")
        star.setAttribute("class","estrella")
        favBtn.appendChild(star)
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
            sessionStorage.removeItem('token')
            setTimeout(window.location.href = data.url, 1500)
        }
        if (data.status == 500){
            alert(data.data)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

const INPUT = document.querySelector('#input')
const SEARCHbtn = document.querySelector('#searchBtn')

// ---------------------------------LOGIN REDIRECT

document.querySelector("#loginBtn")
.addEventListener("click", getLogin)

function getLogin() {
    fetch("/login")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------SIGNUP REDIRECT

document.querySelector("#signUpBtn")
    .addEventListener("click", getSignup)

function getSignup() {
    fetch("/signup")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------FAVS REDIRECT

document.querySelector("#favsBtn")
    .addEventListener("click", goToFavs)

function goToFavs() {
    fetch("/favoritos")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------SEARCH FETCH

SEARCHbtn.addEventListener("click", () => {
    if ( sessionStorage.getItem('token') ){
        fetch(`http://localhost:8080/search/${INPUT.value}`, {
            headers: {
                'authorization': `Bearer: ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == 200){
                console.log("DATA1", data.data);
                data.data.map(el => printData(el))
            }
            if (data.status == 400){
                setTimeout(window.location.href = data.url, 1500)
            }
            if (data.status == 403){
                alert(data.data)
            }
        })
        .catch(err => console.log("Internal server error. Sorry :(", err))
    } else {
        fetch(`http://localhost:8080/search/${INPUT.value}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == 200){
                console.log("DATA", data);
                data.data.map(el => printData(el))
            }
            if (data.status == 400){
                setTimeout(window.location.href = data.url, 1500)
            }
            if (data.status == 403){
                alert(data.data)
            }
        })
        .catch(err => console.log("Internal server error. Sorry :(", err))

    }
})

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
            setFav(element)
        })        
        let star = document.createElement("img")
        star.setAttribute("src", "img/estrella.svg")
        star.setAttribute("class","estrella")
        favBtn.appendChild(star)
}

function setFav(favInfo) {
    console.log(favInfo);
}
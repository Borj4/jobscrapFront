const INPUT = document.querySelector('#input')
const SEARCHbtn = document.querySelector('#searchBTN')

// ---------------------------------LOGIN REDIRECT

document.querySelector("#logBTN")
.addEventListener("click", getLogin)

function getLogin() {
    fetch("/login")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------SIGNUP REDIRECT

document.querySelector("#signBTN")
    .addEventListener("click", getSignup)

function getSignup() {
    fetch("/signup")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------SEARCH FETCH

SEARCHbtn.addEventListener("click", () => {
    if ( sessionStorage.getItem('token') ){
        fetch("http://localhost:8080/search", {
            headers: {
                'authorization': `Bearer: ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({search: INPUT.value})
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == 200){
                data.data.map(el => printData(el))
            }
            if (data.status == 401){
                alert(data.data)
                setTimeout(window.location.href = data.url, 1500)
            }
            if (data.status == 500){
                alert(data.data)
            }
        })
        .catch(err => console.log("Internal server error. Sorry :(", err))
    } else {
        fetch("http://localhost:8080/search", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({search: INPUT.value})
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == 200){
                data.data.map(el => printData(el))
            }
            if (data.status == 401){
                alert(data.data)
                setTimeout(window.location.href = data.url, 1500)
            }
            if (data.status == 500){
                alert(data.data)
            }
        })
        .catch(err => console.log("Internal server error. Sorry :(", err))

    }
})

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
        footerOfert.setAttribute("class", "foorter-ofert")
        card.appendChild(footerOfert);

        let remuneración = document.createElement("h4")
        remuneración.setAttribute("id", "father").setAttribute("class","salary")
        remuneración.innerText = element.remuneracion
        footerOfert.appendChild(remuneración)

        let favBtn = document.createElement("button")
        // favBtn.innerText = "Favoritos"
        favBtn.setAttribute("id", "searchBTN").setAttribute("class","enterBTN")
        footerOfert.appendChild(favBtn)
        favBtn.addEventListener("click", () => {
            setFav(element)
        })        
        let estrella = document.createElement("img")
        estrella.setAttribute("src", "img/estrella.svg").setAttribute("class","searchBTN");
        favBtn.appendChild(estrella)
}

function setFav(favInfo) {
    console.log(favInfo);
}
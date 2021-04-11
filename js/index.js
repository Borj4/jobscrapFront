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
    let card = document.createElement("div")
    card.setAttribute("class", "card")
    document.querySelector(".main")
    .appendChild(card)
        
    let title = document.createElement("h3")
    title.innerText = element.title
    card.appendChild(title)
    
    let description = document.createElement("p")
    description.innerText = element.description
    card.appendChild(description)
    
    let minicard = document.createElement("div")
    // minicard.setAttribute("class", "minicard")
    card.appendChild(minicard)

    let money = document.createElement("h4")
    money.innerText = element.money
    minicard.appendChild(money)

    let points = document.createElement("h4")
    points.innerText = element.points
    minicard.appendChild(points)
    
    
    let favBtn = document.createElement("button")
    favBtn.innerText = "Favoritos"
    minicard.appendChild(favBtn)
    favBtn.addEventListener("click", () => {
        setFav(element)
    })
}

function setFav(favInfo) {
    console.log(favInfo);
}
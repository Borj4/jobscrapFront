const INPUTpass = document.querySelector("#inputPass")

// ---------------------------------------------REESTABLECER

const Url = new URLSearchParams(window.location.search)
const token = Url.get('tok')
console.log(token)

function reestablecer(){
    fetch(`http://localhost:8080/reestablecer/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.data)
            printDynamics(data.userMail, data.id, data.nombre, data.secret)
        }

        if (data.status == 500){
            alert(data.data)
            setTimeout(window.location.href = data.url, 1500)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err)).addEventListener("click", () => login() )
}

reestablecer()

// ---------------------------------------------PRINT

function printDynamics (mail, id, nombre = usuario, secret){

    let cardMensaje = document.createElement("div")
    let mensaje = document.createElement("h2")
    mensaje.setAttribute("class", "textlog")
    mensaje.innerText=`Hola, ${nombre}, escribe tu nueva contraseña`
    cardMensaje.appendChild(mensaje)
    document.querySelector("#container").appendChild(cardMensaje);

    let cardInput  = document.createElement("div")
    let input = document.createElement("input")
    input.setAttribute("placeholder","Escribe aquí tu contraseña.")
    input.setAttribute("class","input").setAttribute("required")
    cardInput.appendChild(input);
    document.querySelector("#container").appendChild(cardInput);

    let cardBoton  = document.createElement("div")
    let boton = document.createElement("button")
    boton.innerText= "Enviar";
    boton.setAttribute("class","basicBtn")
    cardBoton.appendChild(boton);
    document.querySelector("#container").appendChild(cardBoton);
    
   boton.addEventListener("click", () => {
       resetPass (input.value, mail, id, secret)
    })
}

// ---------------------------------------------SIGN UP  

INPUTpass.addEventListener("click", () => resetPass() )
    
function resetPass(pass, mail, id, secret) {
    fetch("http://localhost:8080/newPass", {
        method: 'PUT',
        body: JSON.stringify( {pass: pass, email: mail, id: id, secret: secret} ),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert("Datos correctos. Bienvenido")
            sessionStorage.setItem("token", data.token)
            setTimeout(window.location.href = data.url, 1500)
        }
        if (data.status == 400){
            alert(data.data)
        }
        if (data.status == 406){
            alert(data.data)
        }
        if (data.status == 500){
            alert(data.data)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}
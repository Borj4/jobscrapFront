const INPUTmail = document.querySelector("#inputEmail")
const INPUTpass = document.querySelector("#inpuPass")

// ---------------------------------------------SIGN UP  

document.querySelector("#signUpBtn")
    .addEventListener("click", () => login() )
    
function login() {
    fetch("http://localhost:8080/signup", {
        method: 'POST',
        body: JSON.stringify( {name: inputName.value, email: inputEmail.value, pass: inputPass.value} ),
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
        if (data.status == 401){
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

// ---------------------------------------------VOLVER

document.querySelector("#goBackBtn")
    .addEventListener("click", () => goBack())
    
function goBack() {
    fetch("/")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry ;(", err))
};

document.querySelector("forgotBtn")
    .addEventListener("click", () => forgot())
    
function forgot() {
    fetch("/recuperar")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry ;(", err))
};

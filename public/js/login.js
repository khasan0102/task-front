const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const alertt = document.querySelector("#alertt");

alertt.style.display = "none";

form.onsubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("https://task-app-backend-1.herokuapp.com/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value.toLowerCase(),
            password: password.value
        })
    });

    response = await response.json();
    
    if(response.error) {
        alertt.style.display = "block";
        alertt.textContent = response.message;
    }else {
        window.localStorage.setItem("token", response.data.token);
        window.location = '/';
    }
    
}
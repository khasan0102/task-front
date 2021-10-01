const form = document.querySelector("#form");
const email = document.querySelector("#email");
const alertt = document.querySelector("#alertt");

alertt.style.display = "none";

form.onsubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("https://task-app-backend-1.herokuapp.com/user/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value.toLowerCase()
        })
    });

    response = await response.json();
    
    if(response.error) {
        alertt.style.display = "block";
        alertt.textContent = response.message;
    }else {
        alert(response.message);
    }
}
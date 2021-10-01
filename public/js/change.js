const form = document.querySelector("#form");
const password1 = document.querySelector("#pass");
const password = document.querySelector("#pass2");
const alertt = document.querySelector("#alertt");
const select = document.querySelector("#select");
select.value = window.localStorage.getItem("lang") || select.value;
alertt.style.display = "none";

select.addEventListener("change", () => {
    window.localStorage.setItem("lang", select.value);
});

form.onsubmit = async (event) => {
    event.preventDefault();
    let url = window.location.pathname.split('/')[2];
    if(password.value !== password1.value) {
        alertt.style.display = "block";
        alertt.textContent = "Password don't confirmation";
        return ""
    }

    let lang = select.value;
    let response = await fetch("https://task-app-backend-1.herokuapp.com/user/changePassword/" + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            lang
        },
        body: JSON.stringify({
            password: password.value
        })
    });

    response = await response.json();
    
    if(!response.succes) {
        alertt.style.display = "block";
        alertt.textContent = response.message;
        alertt.style.padding = "15px"
    } else {
        alert(response.message)
        window.location = '/login'
    }
}
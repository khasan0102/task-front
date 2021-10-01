const form = document.querySelector("#form");
const ism = document.querySelector("#name");
const surname = document.querySelector("#surname");
const password = document.querySelector("#password");
const age = document.querySelector("#age");
const file = document.querySelector("#file");
const alertt = document.querySelector("#alertt");

alertt.style.display = "none";

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let token = window.localStorage.getItem("token");

    formData = new FormData();
    formData.append("name", ism.value)
    formData.append("surname", surname.value)
    formData.append("password", password.value)
    formData.append("age", +age.value)
    formData.append("photo", file.files[0])

    let response = await fetch("https://task-app-backend-1.herokuapp.com/user/create", {
        method: "POST",
        headers: {
            authorization: token
        },
        body: formData
    });

    response = await response.json();
    if(response.error) {
        alertt.style.display = "block";
        alertt.textContent = response.message;
    }else {
        window.localStorage.setItem("token", response.data.token);
        window.location = "/";
    }
})

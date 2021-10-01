const form = document.querySelector("#form");
const email = document.querySelector("#email");
const code = document.querySelector("#code");
const alertt = document.querySelector("#alertt");
const select = document.querySelector("#select");

alertt.style.display = "none";
let codeStyle = window.localStorage.getItem("code");

if (!codeStyle) {
    code.style.display = "none";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(code.style.display);
    let isTrue = code.style.display == "none";

    let obj = {
        email: email.value,
        code: isTrue ? "Hello World" : code.value,
    };
    let lang = select.value
    let response = await fetch("http://localhost:3000/user/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            lang
        },
        body: JSON.stringify(obj),
    });

    response = await response.json();

    if (response.error) {
        alertt.style.display = "block";
        alertt.textContent = response.message;
    } else {
        alert(response.message);
        if (!response.data.token) {
            console.log("hello");
            window.localStorage.setItem("code", true);
            window.localStorage.setItem("email", email.value);
            code.style.display = "block";
        } else if (response.data.token) {
            localStorage.clear();
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("auth", true);

            window.location = "/singup";
        }
    }
});

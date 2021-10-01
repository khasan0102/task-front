const form = document.querySelector("#form");
const email = document.querySelector("#email");
const alertt = document.querySelector("#alertt");
const select = document.querySelector("#select");
select.value = window.localStorage.getItem("lang") || select.value;
alertt.style.display = "none";

select.addEventListener("change", () => {
    window.localStorage.setItem("lang", select.value);
});

form.onsubmit = async (event) => {
    event.preventDefault();
    let lang = select.value;
    let response = await fetch("https://task-app-backend-1.herokuapp.com/user/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            lang
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
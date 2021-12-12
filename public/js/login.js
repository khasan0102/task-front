const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const alertt = document.querySelector("#alertt");
const select = document.querySelector("#select");
select.value = window.localStorage.getItem("lang") || select.value;
alertt.style.display = "none";

select.addEventListener("change", () => {
    window.localStorage.setItem("lang", select.value);
});

form.onsubmit = async (event) => {
    
}



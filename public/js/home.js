const row = document.querySelector("#row");
token = window.localStorage.getItem("token");
const select = document.querySelector("#select");
select.value = window.localStorage.getItem("lang") || select.value;

select.addEventListener("change", () => {
    window.localStorage.setItem("lang", select.value);
});

let socket = io("https://task-app-backend-1.herokuapp.com", {
    transports: ["websocket"],
});

socket.emit("connected", { token });

socket.on("hello", async ({ user_id, date }) => {
    let elements = document.querySelectorAll(".card-text1");
    let counts = document.querySelectorAll(".btn-primary");
    let isTrue = true;
    for (let el of elements) {
        if (el.id == user_id) {
            el.textContent = date;
            isTrue = false;
            break;
        }
    }

    for (let el of counts) {
        if (el.id == user_id && date == "online") {
            el.textContent = "Count of entries: " + ++el.dataset.count
            break;
        }
    }

    if (isTrue) {
        let response = await fetch("https://task-app-backend-1.herokuapp.com/user/" + user_id, {
            method: "GET",
            headers: {
                authorization: token
            }
        });


        response = await response.json();
        console.log(response);
        if(response.succes){
            makeElement(response.data.user)
        }
    }
});


function makeElement(el, element) {
    let col = document.createElement("div");
    let card = document.createElement("div");
    let img = document.createElement("img");
    let cardBody = document.createElement("div");
    let name = document.createElement("h5");
    let surname = document.createElement("h5");
    let email = document.createElement("p");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let onlineText = document.createElement("h5");

    col.classList.add("col-md-4");
    card.classList.add("card");
    card.style.width = "18rem";
    cardBody.classList.add("card-body");

    onlineText.setAttribute("id", el._id);

    img.src = el.photo_path;
    img.classList.add("card-img-top");
    name.classList.add("card-title");
    surname.classList.add("card-title");
    email.classList.add("card-title");
    p.classList.add("card-text");
    span.classList = "btn btn-primary";
    onlineText.classList = "card-text1";
    name.textContent = el.name;
    surname.textContent = el.surname;
    email.textContent = el.email;
    p.textContent = el.surname;
    span.textContent = "Count of entries: " + el.count_views;
    onlineText.textContent = "     ";
    span.id = el._id
    span.dataset.count = el.count_views

    cardBody.append(name);
    cardBody.append(surname);
    cardBody.append(email);
    cardBody.append(p);
    cardBody.append(onlineText);
    cardBody.append(span);

    card.append(img);
    card.append(cardBody);
    col.append(card);
    element.append(col);
}


function renderElements(array, element) {
    element.innerHTML = null;
    for (let el of array) {
        makeElement(el, element)
    }
}

async function getUsers() {
    let response = await fetch("https://task-app-backend-1.herokuapp.com/user/all", {
        method: "GET",
        headers: {
            authorization: token,
        },
    });

    response = await response.json();
    renderElements(response.data.users, row);
}

socket.on("users", ({ users }) => {
    setTimeout(() => {
        console.log("hello world");
        let elements = document.querySelectorAll(".card-text1");
        let counts = document.querySelectorAll(".btn-primary")
        for (let el of elements) {
            if (users[el.id]) {
                if (users[el.id].id) el.textContent = "online";
            }
        }
    }, 250);
});

getUsers();


exit.onclick = () => {
    window.localStorage.clear();
    window.location = '/login';
}
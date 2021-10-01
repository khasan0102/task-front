const express = require("express");
const path = require("path")
const ejs = require("ejs");

const app = express();

app.use(express.static(path.join(__dirname, "public")))

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/singup", (req, res) => {
    res.render("singup");
});

app.get("/forgot", (req, res) => {
    res.render("forgot");
});

app.get("/auth", (req, res) => {
    res.render("check");
});

app.get("/change/:token", (req, res) => {
    res.render("change");
});

app.listen(process.env.PORT || 4000, () => console.log("front serverri ishga tushdi"));
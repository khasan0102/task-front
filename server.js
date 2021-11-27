const express = require("express");
const path = require("path")
const ejs = require("ejs");
const app = express();
const fs =  require("fs");
const EventEmitter = require("events");
const { Radio } = require("./radio_class")
const RequestIp = require('@supercharge/request-ip')
const ipInfo = require("ip-info-finder")
const ipLocation = require("ip-location")

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


app.get("/", async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // const address = await ipInfo.getIPInfo(ip);
    const address = await ipLocation(ip)
    res.json(address)
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
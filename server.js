const express = require("express");
const path = require("path")
const ejs = require("ejs");
const app = express();
const fs =  require("fs");
const EventEmitter = require("events");
const { Radio } = require("./radio_class")
const radio = new Radio(['euro', 'uzbek'])


app.get('/stream/:folder', (req, res) => {
    const { id, responseSink } = radio.makeResponseSink(req.params.folder)
    responseSink.pipe(res).type('audio/mpeg')
    // const { id, responseSink } = makeResponseSink()
    // responseSink.pipe(res).type('audio/mpeg')
    // req.app.sinkId = id;
})


app.get('/stop/:folder', (req, res) => {
    const { folder } = req.params
    const is_on = radio.isTrues[folder]

    if(is_on) {
        return res.json({
            message: "Bu portdagi radio allaqachon o'chgan"
        })
    }

    radio._stopLoop(folder)

    res.json({
        message: "radio o'chdi"
    })
})



app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


app.get("/", async (req, res) => {
    res.render("index")
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
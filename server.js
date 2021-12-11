const express = require("express");
const path = require("path")
const ejs = require("ejs");
const app = express();
const fs = require("fs");
const EventEmitter = require("events");
const { Radio } = require("./radio_class")
const { fetchAll } = require("./postgres");
const RequestIp = require('@supercharge/request-ip')
const ipInfo = require("ip-info-finder")
const ipLocation = require("ip-location")
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
// Typescript:
// import { WebServiceClient } from '@maxmind/geoip2-node';

// To use the GeoLite2 web service instead of GeoIP2 Precision, set the
// host to geolite.info, e.g.:
// new WebServiceClient('1234', 'licenseKey', {host: 'geolite.info'});
const client = new WebServiceClient('639577', 'mzSV3bWyBwHgyYjq', { host: 'geolite.info' });

const query = `
    SELECT 
        t.teacher_name,
        g.group_name,
        c.course_name,
        g.group_id
    FROM groups g
    INNER JOIN teachers t ON t.teacher_id = g.teacher_id
    INNER JOIN courses c ON c.course_id = g.course_id
    WHERE 
        CASE
            WHEN $1 > 0 THEN t.teacher_id = ANY($2)
            ELSE true
        END;
`


app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", async (req, res) => {
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // const address = await ipInfo.getIPInfo(ip);
    // const city = await client.city('81.95.233.165')
    // const arr = [] 
    // const rows = await fetchAll(query, arr.length, arr);
    // console.log(rows)
    res.json({
        message: "Hello"
    })
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
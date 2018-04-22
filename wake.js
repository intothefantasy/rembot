const http = require('http');
const express = require('express');
const app = express();
const moment = require('moment-timezone');
const db = require('./db/main.js');
const config = require("./config.json");

app.use(express.static('public'));

app.get("/", (request, response) => {
  console.log( moment().tz(config.timeZone).format(config.readAbleFormatDate)+ " Ping Received");
  response.sendStatus(200);
});
app.get("/views", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

app.get("/currency", (request, response) => {
  db.getAll().then(result => {
      response.send(result);
  });
});

const http = require('http');
const express = require('express');
const app = express();
var dateFormat = require('dateformat');
var datenow = new Date();
const db = require('./db/main.js');

app.use(express.static('public'));

app.get("/", (request, response) => {
  console.log(dateFormat(datenow)+ " Ping Received");
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

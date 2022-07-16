let express = require('express');
let app = express();

console.log('Hello World');

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  let time_obj = { 'time': req.time };
  res.json(time_obj);
});

//app.get("/", (req, res) => res.send("Hello Express"))

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/json", (req, res) => {
  var response = "Hello json";

  if (process.env.MESSAGE_STYLE == "uppercase")
    response = response.toUpperCase();

  res.json({ "message": response });
});



















module.exports = app;

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

console.log('Hello World');

app
  .use("/public", express.static(__dirname + "/public"))
  .use(bodyParser.urlencoded({ extended: false }))
  .use((req, res, next) => {
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

app.get('/:word/echo', function (req, res, next) {
  res.send({ 'echo': req.params.word });
});

app.route('/name')
  .get((req, res) => {
    res.json({ 'name': req.query.first + ' ' + req.query.last })
  })
  .post((req, res) => {
    res.json({ 'name': req.body.first + ' ' + req.body.last })
  });



















module.exports = app;

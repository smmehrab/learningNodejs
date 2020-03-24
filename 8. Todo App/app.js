var express = require('express');
var bodyParser = require('body-parser')
var todoController = require('./controllers/todoController');


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

// template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

app.listen(3000);
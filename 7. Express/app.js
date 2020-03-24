var express = require('express');
var path = require('path');
// const ejsLint = require('ejs-lint');
var bodyParser = require('body-parser')

// create application/json parser
// var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Express App Inititalization
// Now, we have access of all those different methods.
var app = express();

// Template Engine (View Engine)
// We can embed data from js to html files
// We will use ejs template engine
// npm install ejs -save
// We need to first tell express that we want to use ejs as our view engine
app.set('view engine', 'ejs');
// By default, when we request some view or template,
// it's gonna look at ./views folder

//    In templates, we can add anything that we used to add on our html file.
//    In addition to, embedding js & data into it.
//    <%= varName %>
//    That's how we output data.
//    <% arr.forEach(function(item){ %>
//        <%=item%>
//    <% }); %>
//    That's how we embed js code.

// <% =data %>
// <% code %>


/* Partial Views */
// To include partial views
// <%- include('pathToPartialView') %>


// GET - app.get('route', fn)
// POST - app.post('route', fn)
// DELETE - app.delete('route', fn)

app.get('/', function(req, res) {
    res.send('Let\'s Make It A Better World.');
    // You don't need to specify content-type in express
    // Express is clever enough to figure that out by itself
});

app.get('/home', function(req, res) {
    // res.sendFile(__dirname + '/index.html');
    // Serving html

    /* Query Strings */
    // Starts with ? and each query is separated by '&' if there's multiple of them.
    // We gotta use the query property of this req object
    // console.log(req.query);

    res.render('index', { qs: req.query });
});

/*POST Req */
// For submitting data to the server
// Without using query strings
// form method - POST
// form action - the url that we are gonna post the request to

// req object can't handle passing the post data for us.
// We need to use some middleware for that.
// One is called 'body-parser'
// npm install body-parser

// POST /home gets urlencoded bodies
app.post('/home', urlencodedParser, function(req, res) {
    console.log(req.body);
    res.render('index-success', { data: req.body });
});
// To send that data to a mail or something
// We can use a package called 'nodemailer'


// Route Parameters
app.get('/profile/:name', function(req, res) {
    // res.send(req.params.name + '\'s Profile');

    var data = { age: 21, job: 'Learner', hobbies: ['Reading', 'Traveling', 'Doing Martial Art'] };
    res.render('profile', { person: req.params.name.toUpperCase(), data: data });
    // By default, renders the specific view from 'views' folder.
    // And sending data as object on second param.f
});

/* Middleware */
// Middleware is essentially the code that runs between a req & a res

// We are gonna use some custom middleware to serve those static files, images, css etc.

// To use a middleware
app.use('/assets', function(req, res, next) {
    // Only log the url after the route portion
    // '/assets' + url
    console.log(req.url);

    // next indicates, we finished our middleware
    // Now, go on to the next middleware
    next();
});
// We can attach it to a certain route or it will be applied to every requests that will be made.
// In this case, only the req made for files in assets folder will fire this middleware.

// Fortunately express comes with pre-defined middlewares to serve static files
app.use('/assets', express.static('assets'));
// Any request to that route will be mapped to the folder 'assets'
// And it's gonna serve whatever we requests
// express.static() handles it all

// Listening to a specific port
app.listen(3000);
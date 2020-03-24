// HTTP: one of node js's pre-defined module
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    // Whenever we send a request to this server,
    // this function is going to execute

    console.log('Request was made: ' + req.url);

    // Routing
    if (req.url === '/text') {
        servingPlainText(res);
    } else if (req.url === '/' || req.url === '/home' || req.url === '/html') {
        servingHtmlPage(res);
    } else if (req.url === '/json') {
        servingJSON(res);
    } else {
        serving404(res);
    }
});

function servingPlainText(res) {
    // Adding status & headers
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Adding response body
    // res.end('Hey, Nice to Meet You!');

    // Streams
    var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');
    myReadStream.pipe(res); // Piping to res
}

function servingHtmlPage(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var myReadStream = fs.createReadStream(__dirname + '/index.html');
    myReadStream.pipe(res);
}

function servingJSON(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var myObj = {
        name: 'smmehrab',
        job: 'student',
        age: 21
    };

    // .end() expects either a string or a buffer.
    // But myObj is an object. 
    // So, we need to stringify the object.
    res.end(JSON.stringify(myObj));
}

function serving404(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var myReadStream = fs.createReadStream(__dirname + '/404.html');
    myReadStream.pipe(res);
}

server.listen(3000, 'localhost');
console.log('Server is listening...');

/* NPM */
// Express Package - helps us in routing, templating & search
// npm install express

/* package.json */
// To keep track of all of those packages that we depend on.
// npm init
// To create package.json

/* Dependencies */
// npm install packageName -save
// To add the package as dependency
// And when another dev will have the package.json file & the project
// All he need to do is 'npm install'
// Npm will automatically install all the dependencies from package.json file.
// Cool, isn't it?

/* Nodemon Package */
// It monitors your application files.
// If any changes monitored, it restart the server automatically.
// npm install -g nodemon
// Installing globally. Will work for all applications in our computer.
// To Run
// nodemon app.js
// instead of
// node app.js
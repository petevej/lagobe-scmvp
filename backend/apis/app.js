var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('config');
var routes = require('./routes/'); //routes are defined here
var expressJwt = require('express-jwt');
var guard = require('express-jwt-permissions')();
var jwt = require('jsonwebtoken');
//var swaggerJSDoc = require('swagger-jsdoc');


var app = express(); //Create the Express app

//var swaggerSpec = swaggerJSDoc({
//    swaggerDefinition: {
//        info: {
//            title: 'Sector5 API',
//            version: '1.0.0',
//            description: 'Demonstrating how to desribe a RESTful API with Swagger',
//        },
//        host: 'localhost:8000',
//        basePath: '/',
//    },
//    apis: ['./routes/*.js'],
//});


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); //This is our route middleware

//app.get('/swagger.json', function (req, res) {
//    res.setHeader('Content-Type', 'application/json');
//    res.send(swaggerSpec);
//});

app.get('/summary', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'summary.html'));
});

//app.use(function(err, req, res, next){
//  if (err.constructor.name === 'UnauthorizedError') {
//    res.status(401).send('Unauthorized');
//  }
//});

//// If no route is matched by now, it must be a 404
//app.use(function (req, res, next) {
//    res.status(404).send('Not Found');
//
//    var err = new Error('Not Found');
//    err.status = 404;
//
//    next(err);
//});

module.exports = app;
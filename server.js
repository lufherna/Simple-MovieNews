// Dependencies below
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");
// set handlebars
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
// requiring note and article models
// var Article = require("./models/Article.js");
// var Note = require("./models/Note.js");

// this is for heroku deployment
var PORT = process.env.PORT || 3000

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from Screen Rant's movie news:" +
            "\n***********************************\n");


// connect to the mongo db
mongoose.connect('mongodb://localhost/', 
  {useMongoClient: true }
);

var db = mongoose.connection;

// any mongoose errors
db.on('error', function(error) {
  console.log('Mongoose Error: ', error)
});
// success messages 
db.on('open', function() {
  console.log('Mongoose connection successful');
});

// Make public a static dir
app.use(express.static('public'));

// initialize express
var app = express();

// express-handlebars npm package
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars') 
// uses body parser with the app
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var router = require('./controllers/controller.js');
app.use('/', router)

app.listen(3000, function() {
console.log("The magic happens on port 3000");
})
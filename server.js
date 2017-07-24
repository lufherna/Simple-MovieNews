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
var Article = require("./models/Article.js");
var Note = require("./models/Note.js");

// this is for heroku deployment
var PORT = process.env.PORT || 3000

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from Screen Rant's movie news:" +
            "\n***********************************\n");


var dbConnect =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/MovieNews';

// mongoDB_URI : mongodb://heroku_f727w5fr:epf9p9fd2brsmmfop5246
//vu6r3@ds115583.mlab.com:15583/heroku_f727w5fr

// connect to the mongo db
mongoose.connect(dbConnect, 
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

// initialize express
var app = express();

// Make public a static dir
app.use(express.static('public'));


// express-handlebars npm package
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars') 
// uses body parser with the app
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var router = require('./controllers/controller.js');
app.use('/', router)

app.listen(3000, function() {
console.log("The magic happens on port 3000");
})
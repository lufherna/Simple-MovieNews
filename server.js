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
var Article = require()
var Note = require()


// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from Screen Rant's movie news:" +
            "\n***********************************\n");

// initialize express
var app = express();

// uses body parser with our app
app.use(bodyParser.urlencoded({
  extended: false
}))

// Make public a static dir
app.use(express.static('public'));

// Database configuration with mongoose
mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;

// any mongoose error
db.on('error', function(error) {
  console.log('Mongoose Error: ', error)
});
// success messages 
db.on('open', function() {
  console.log('Mongoose connection successful');
});

// Routes
// =======

// get request to grab the sites' info 
app.get('/scrape', function(req, res){
// Making a request for screen rant's webdev" board. The page's HTML is passed as the callback's third argument
  request("http://screenrant.com/movie-news/", function(error, response, html) {
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);
    // (i: iterator. element: the current element)
    $("div.info-wrapper").each(function(i, element) {

      // An empty object to save the data that we'll scrape
      var results = {};
      // grabs title from each news article. code works below
      results.title = $(element).find(".title").text();
      // grabs the link title. code works below ;
      results.link = $(element).find('.link').attr("href");
      
      //using the article model, create a new entry
      // this passes the result object to the entry
      var entry = new Article(results);

      // save the entry to the database
      entry.save(function(err, doc) {
        if(err) {
          console.log(err)
        } else {
          console.log(doc)
        }
      });

      });
    });
    // done with scraping the text 
    res.send("Scrape Complete");
  }); // done with scape function 
      
  // this will grab the articles that are scraped from mongodb
  app.get('/articles', function(req, res) {
    // grab every doc in the articles array
    Article.find({})
      .populate("Note")
      .exec(function(error, doc) {
        if(error) {
          console.log(error)
        } else {
          // send the doc to the browser as a json object
          res.json(doc)
        }
      })
  })





















    app.listen(3000, function() {
      console.log("The magic happens on port 3000");
    })



      // Save the text of the element in a "title" variable
  // Log the results once you've looped through each of the elements found with cheerio
  // console.log(results);
      // var title = $(element).text();

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      // var link = $(element).attr("a.href");

      // Save these results in an object that we'll push into the results array we defined earlier
    //   results.push({
    //     title: title,
    //     link: link
 
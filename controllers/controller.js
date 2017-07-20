// npm dependencies
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
// this dependency creates mountable route handlers (portable)
var router = express.Router();
var express = require('express');

// needs these models
var Note = require('./../models/Note.js');
var Article = require('./../models/Article.js');

// connect to a mongo database via URI
// use mongolab to connect the mongodb to heroku
var db = 
	process.env.MONGODB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/';

// Connecting to my MongoDB Database
mongoose.connect('mongodb://localhost:27017//MovieNews', {useMongoClient: true});

router.get('/', function(req, res) {
	// this is index.handlebars
	res.render('index')
})

mongoose.connect(db, function(err, res) {

	if(err) {
		console.log("error connection to: " + db '. ' + err)
	} else {
		console.log("connected correctly to: " + db);
	}
});

// screen rant movie url 
var url = "http://screenrant.com/movie-news/";

router.get('/scrape', function(req, res){
// Making a request for screen rant's webdev" board. The page's HTML is passed as the callback's third argument
  request(url, function(error, response, html) {
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
      
      console.log(results);
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
    }); // end of for loop 
    
  });
    // done with scraping the text 
    res.send("Scrape Complete");
}); // done with scape function 

router.post('/scrape', function(req, res) {


})

// this grabs the notes from /notes page
router.get('/notes', function(req, res) {
	notes.find({})
		.populate('note')

		.exec(function(error, doc) {
			if (error) {
				console.log(error)
			} else {
				res.json(doc)
			}
		}) // ends exec function
	}); // ends .get function

router.get('/notes/:id', function(req, res) {

	Notes.findOne({'_id': req.params.id})
		.populate('note')

		.exec(function(error, doc) {
			if(error) {
				console.log(error)
			} else {
				res.json(doc)
			} 
		}) // exec function
}) // router.post

router.post('/notes/:id', function(req, res) {


})

module.exports = router;

// npm dependencies
// have to remember that the controller only routes stuff
// no connection to db needed here. as long as it's woring on
// the server.js file 
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var express = require('express');
// this dependency creates mountable route handlers (portable)
var router = express.Router();

// needs these models
var Note = require('./../models/Note.js');
var Article = require('./../models/Article.js');

router.get('/', function(req, res) {
	// this is index.handlebars
	res.render('index')
})


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

// this will grab the articles scraped from the MongoDB
router.get('/articles', function(req, res) {
	// grab each doc in the articles array
	// limits the number of articles that comes back
	Article.find({}).limit(10)
	  .populate('note')
	  .exec(function(error, doc) {
	  	// log errors
	  	if (error) {
	  		console.log(error)
	  	} else {
	  	// send the doc to the browser as a json object
	  		res.json(doc)
	  	}
	  });// end of exec function
	}); // end of router.get function

/*// this grabs the notes from /notes page
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
	}); // ends .get function*/

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

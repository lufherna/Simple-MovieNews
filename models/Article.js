// this requires mongoose
var mongoose = require('mongoose');
// create schema
var Schema = mongoose.Schema;

// Create a new article schema
// use code below as a constructor
var articleSchema = new Schema({
	title: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	},
})
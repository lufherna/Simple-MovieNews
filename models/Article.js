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
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;

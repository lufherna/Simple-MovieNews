// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// Create the note schema
var NoteSchema = new Schema({

	title: {
		type: String
	},

	body: {
		type: String
	}
});


// Create the Note Model with the Note Schema
var Note = mongoose.model("Note", NoteSchema);

// export the note module
module.exports = Note;
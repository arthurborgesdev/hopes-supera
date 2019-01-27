var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema declaration
var ArtsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	imageURL: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	createdOn: {
		type: String,
		required: true
	}
});

// Schema compiling and exportation
module.exports = mongoose.model('Art', UserSchema);
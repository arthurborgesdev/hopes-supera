var mongoose = require('mongoose');

// Schema declaration
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdOn: {
		type: String,
		required: true
	}
});

// Schema compiling and exportation
module.exports = mongoose.model('User', UserSchema);
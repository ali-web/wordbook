var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	text: String
});

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});

var wordSchema = new mongoose.Schema({
	text: {type: String, required: true},
	definition: String,
	meaning: [ {type: String} ],
	example: String,
	found:   [ {type: String} ],
	hashtag: [ {type: String} ],
	synonym: [ {type: String} ],
	antonym: [ {type: String} ],
	family:  [ {type: String} ],
	kind: {
		type: String,
		enum: ['verb', 'noun', 'adjective', 'adverb', 'expression', 'idiom', 'sentence']
	},
	formality: {
		type: String,
		enum: ['formal', 'informal', 'slang'],
	},
	tense: {
		type: String,
		enum: ['present', 'past', 'pp', "none"],
	},
	root: {
		present: String,
		past: String,
		pp: String
	},
	creator: String,
	created_at: {type: Date, default: Date.now}
});

mongoose.model('Post', postSchema);
mongoose.model('User', userSchema, 'user');
mongoose.model('Word', wordSchema, 'word');

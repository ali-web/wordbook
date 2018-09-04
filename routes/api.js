var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');
var Word = mongoose.model('Word');
//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);
router.use('/words', isAuthenticated);
router.use('/suggest', isAuthenticated);



router.route('/suggest')
		.get(function(req, res){

			var request = require('request');
			var cheerio = require('cheerio');

			var url = 'https://translate.google.ca/#en/fa/' + req.body.text;

			request(url, function(error, response, html){
				if(!error){
					var $ = cheerio.load(html);

					var title, gt_lc;

					gt_lc = $('#gt-lc');

					// Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

					res.send(200, gt_lc);
				}
			})
		});


router.route('/words')
		// adds a new word
		.post(function(req, res){
			console.log(req.authenticatedUser);
			console.log(req.session.user_id);

			var word = new Word();
			word.text = req.body.text;
			word.kind = req.body.kind;
			word.formality = req.body.formality;
			word.definition = req.body.definition;
			if (req.body.meaning){
				word.meaning = req.body.meaning.split(" - ");
			}
			word.example = req.body.example;
			word.creator = req.body.created_by;
			if (req.body.found){
				word.found = req.body.found.split(" ");
			}
			if (req.body.hashtag){
				word.hashtag = req.body.hashtag.split(" ");
			}
			if (req.body.synonym){
				word.synonym = req.body.synonym.split(" - ");
			}
			if (req.body.antonym){
				word.antonym = req.body.antonym.split(" - ");
			}
			if (req.body.family){
				word.family = req.body.family.split(" - ");
			}

			word.save(function(err, word){
				if (err){
					var stack = new Error().stack;
					console.log( stack );
					return res.send(500, err);
				}
				return res.json(word);
			});
		})

		//gets all words
		.get(function(req, res){
			Word.find({ "text":{$ne:null}, "creator": req.session.user_id}, function(err, words){
				console.log(req.authenticatedUser);
				console.log(req.session.user_id);
				if (err){
					return res.send(500, err);
				}
				console.log(words);

				for (w in words){
					// This needs to be fixed
					// w.creation_date = w.
				}

				return res.send(200, words);
			}).sort({created_at: -1});
		});


//post-specific commands. likely won't be used
router.route('/words/:id')
	//gets specified post
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			res.json(post);
		});
	}) 
	//updates specified post
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);

			post.created_by = req.body.created_by;
			post.text = req.body.text;

			post.save(function(err, post){
				if(err)
					res.send(err);

				res.json(post);
			});
		});
	})
	//deletes the post
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});

module.exports = router;
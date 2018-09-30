const express = require('express');
const router = express.Router();

module.exports = (passport) => {

	//sends successful login state back to angular
	router.get('/success', (req, res) => {
		res.send({state: 'success', user: req.user ? req.user : null});
	});

	//sends failure login state back to angular
	router.get('/failure', (req, res) => {
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//log out
	router.get('/signout', (req, res) => {
		delete req.session.user_id;
		req.logout();
		res.redirect('/');
	});

	return router;
}
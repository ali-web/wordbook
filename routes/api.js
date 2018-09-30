const express = require('express');

const WordController = require('../controller/WordController');
const SuggestController = require('../controller/SuggestController');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
	// allow all get requests
	if (req.method === "GET") {
		return next();
	}
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/words', isAuthenticated);
router.use('/words', WordController);


router.use('/suggest', isAuthenticated);
router.use('/suggest', SuggestController)


module.exports = router;
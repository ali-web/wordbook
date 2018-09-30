const express = require('express');
const router = express.Router();

/* GET home page. */
//changed to *, so that crawlers will not face 404 as they are not using html5 pushstate like browsers
//router.get('/', function(req, res, next) {
/*router.get('*', function(req, res, next) {
	if (req.url == '/')
		res.render('index', { title: "Wordbook"});
	else
		next();
});*/
router.get('/', (req, res, next) => {
	res.render('index', { title: "Wordbook"});
});

module.exports = router;

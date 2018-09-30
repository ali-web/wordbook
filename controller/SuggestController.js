const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const Word = require('../models/Word');

const router = express.Router();


router.get('/', (req, res) => {
    const url = 'https://translate.google.ca/#en/fa/' + req.body.text;

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var title, gt_lc;
            gt_lc = $('#gt-lc');
            // Since the rating is in a different section of the DOM, we'll
            // have to write a new jQuery filter to extract this information.
            res.send(200, gt_lc);
        }
    })
});


module.exports = router;
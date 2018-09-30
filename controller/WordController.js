const express = require('express');
const Word = require('../models/Word');

const router = express.Router();


//gets all words
router.get('/', (req, res) => {
    userId = req.session.user_id;
    console.log(`userid is: ${userId}`);

    return Word.list(userId)
        .then(words => res.send(200, words))
        .catch(err => {
            console.error(err);
            res.send(500, err);
        });

// adds a new word
router.post('/', (req, res) => {
    console.log(req.session.user_id);

    return Word.new(req.body)
        .then(word => res.json(word))
        .catch(err => {
            console.log(err);
            return res.send(500, err);
        });		
    });
});


module.exports = router;

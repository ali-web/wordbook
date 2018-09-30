const mongoose = require('mongoose');
const Promise = require('bluebird');
const schema = require('../schemas/WordSchema');
const wordSchema = new mongoose.Schema(schema);

mongoose.Promise = Promise;

const Word = mongoose.model('Word', wordSchema, 'word');

Word.new = (data) => {
    const word = new Word();
    word.text = data.text;
    word.kind = data.kind;
    word.formality = data.formality;
    word.definition = data.definition;
    if (data.meaning){
        word.meaning = data.meaning.split(" - ");
    }
    word.example = data.example;
    word.creator = data.created_by;
    if (data.found){
        word.found = data.found.split(" ");
    }
    if (data.hashtag){
        word.hashtag = data.hashtag.split(" ");
    }
    if (data.synonym){
        word.synonym = data.synonym.split(" - ");
    }
    if (data.antonym){
        word.antonym = data.antonym.split(" - ");
    }
    if (data.family){
        word.family = data.family.split(" - ");
    }

    return word.save();
};


Word.list = (userId) => {
    return Word.find({ "text": { $ne: null }, "creator": userId }).sort({ created_at: -1 })
    .then(words => {
        console.log(`Word count for this user is: ${words.length}`);
        console.log(words[0]);
        return words;
    })
    .catch(err => {
        console.error(err);
        throw err;
    });
}


module.exports = Word;
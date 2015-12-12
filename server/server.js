/**
 * Created by ali on 2015-11-18.
 */

var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors());

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dic");

var Word = mongoose.model(
    'Word',
    new mongoose.Schema({word: String}),
    'word'
);

app.get("/", function(req, res){
    Word.find({ "word":{$ne:null} }, function(err, words){
      res.send(words);
    })
})

//var EnWord = mongoose.model()


app.listen(3000);

/*
var product = new Product({name: 'WebStorm'});
product.save(function (err) {
    if (err){
        console.log('failed');
    } else{
        console.log('saved');
    }
});
*/

/*var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 's3kreee7'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

connection.end();*/

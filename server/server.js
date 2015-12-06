/**
 * Created by ali on 2015-11-18.
 */

var express = require("express");
var app = express();

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/jetbrains");

var Product = mongoose.model('Product', {name: String});

app.get("/", function(req, res){
    Product.find(function(err, products){
      res.send(products)
    })
})


app.listen(3000)

/*
var product = new Product({name: 'WebStorm'});
product.save(function (err) {
    if (err){
        console.log('failed');
    } else{
        console.log('saved');
    }
});*/

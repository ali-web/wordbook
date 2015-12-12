/**
 * Created by ali on 2015-12-11.
 */

var dic = angular.module('dic', []);

dic.controller('AppCtrl', function($http){
    var app = this;
    $http.get('http://localhost:3000').success(function(words){
        app.words = words;
    })
})

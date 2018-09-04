var app = angular.module('wordbook', ['ngRoute', 'ngResource']).run(function($rootScope, $window, $http) {
	if ($window.sessionStorage.current_user){
		$rootScope.authenticated = true;
		$rootScope.current_user = $window.sessionStorage.current_user;
	} else {
		$rootScope.authenticated = false;
		$rootScope.current_user = '';
	}
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
		$window.sessionStorage.current_user = '';
	};
});

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});

	//added by my to remove sharp sign from URLs
	$locationProvider.html5Mode(true);
});

app.factory('wordService', function($resource){
	return $resource('/api/words/:id');
});

app.controller('mainController', function(wordService, $scope, $rootScope){
	$scope.words = wordService.query();
	$scope.newWord = {creator: '', text: '', meaning: '', example: '', created_at: ''};
	
	$scope.addWord = function() {
	  $scope.newWord.created_by = $rootScope.current_user;
	  $scope.newWord.created_at = Date.now();
	  wordService.save($scope.newWord, function(){
	    $scope.words = wordService.query();
	    $scope.newWord = {created_by: '', text: '', meaning: '', example: '', created_at: ''};
	  });
	};
});

app.controller('authController', function($scope, $http, $rootScope, $window, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
		//added by me
        $window.sessionStorage.current_user = data.user.username;
        $location.path('/');
		  //$window.location.href = 'http://localhost:3000';
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
		  //added by me
		  $window.sessionStorage.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});
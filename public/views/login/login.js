'use strict';

var LoginCtl = function($scope, $interval, $location, messages, AuthService) {
	var ctrl = this;
	ctrl.messages = messages;
	
	ctrl.isAuthenticated = false;
	ctrl.onSignIn = function() {
		var onError = function(error) {
			ctrl.isAuthenticated = false;			
			ctrl.errorMsg = error.msg;
		};
		
		var onSuccess = function(success) {
			ctrl.isAuthenticated = true;
			$location.path("/adminbloglist");
		};
		
		var loginData = {
			email : ctrl.username,
			password : ctrl.password
		}
		AuthService.login(loginData, onSuccess, onError);
	};
	
}

angular.module('login', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'views/login/login.html',
		controller:  LoginCtl,
		controllerAs: 'ctrl'
	});
}]);
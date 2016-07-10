'use strict';

var HomeCtl = function($scope, messages) {
	var ctrl = this;
	ctrl.messages = messages;
}

angular.module('home', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'views/home/home.html',
			controller: HomeCtl,
			controllerAs: 'ctrl'
		});
	}]);
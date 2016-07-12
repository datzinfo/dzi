'use strict';

var HomeCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}

angular.module('home', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/home/home.html',
			controller: HomeCtl,
			controllerAs: 'ctrl'
		});
	}]);
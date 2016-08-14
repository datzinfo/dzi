'use strict';

var AboutCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;

}


angular.module('about', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/aboutUs', {
			templateUrl: 'app/views/about/about.html',
			controller:  AboutCtl,
			controllerAs: 'ctrl'
		});
	}]);
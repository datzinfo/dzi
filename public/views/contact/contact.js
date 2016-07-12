'use strict';

var ContactCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}


angular.module('contact', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/contact', {
			templateUrl: 'views/contact/contact.html',
			controller:  ContactCtl,
			controllerAs: 'ctrl'
		});
	}]);
'use strict';

var SupportCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}


angular.module('support', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/support', {
			templateUrl: 'app/views/support/support.html',
			controller:  SupportCtl,
			controllerAs: 'ctrl'
		});
	}]);
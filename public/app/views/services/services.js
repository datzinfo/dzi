'use strict';

var ServicesCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}


angular.module('service', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/service', {
			templateUrl: 'app/views/services/services.html',
			controller:  ServicesCtl,
			controllerAs: 'ctrl'
		});
	}]);
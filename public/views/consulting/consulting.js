'use strict';

var ConsultingCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}


angular.module('consulting', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/consulting', {
			templateUrl: 'views/consulting/consulting.html',
			controller:  ConsultingCtl,
			controllerAs: 'ctrl'
		});
	}]);
'use strict';

var SupportCtl = function($scope, messages, $rootScope) {	
	$rootScope.activeView = 'service';

	var ctrl = this;
	ctrl.messages = messages;
}


angular.module('support', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/support', {
			templateUrl: 'app/views/support/support.html',
			controller:  SupportCtl,
			controllerAs: 'ctrl'
		});
	}]);
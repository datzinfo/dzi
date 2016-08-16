'use strict';

var ServicesCtl = function($scope, messages, $rootScope) {	
	$rootScope.activeView = 'service';

	var ctrl = this;
	ctrl.messages = messages;
}


angular.module('service', ['ngRoute']) 
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/service', {
			templateUrl: 'app/views/services/services.html',
			controller:  ServicesCtl,
			controllerAs: 'ctrl'
		});
	}]);
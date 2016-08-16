'use strict';

var ConsultingCtl = function($scope, messages, $rootScope) {	
	$rootScope.activeView = 'service';

	var ctrl = this;
	ctrl.messages = messages;
}


angular.module('consulting', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/consulting', {
			templateUrl: 'app/views/consulting/consulting.html',
			controller:  ConsultingCtl,
			controllerAs: 'ctrl'
		});
	}]);
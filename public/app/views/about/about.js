'use strict';

var AboutCtl = ['$scope', 'messages', '$rootScope', function($scope, messages, $rootScope) {
	$rootScope.activeView = 'about';

	var ctrl = this;
	ctrl.messages = messages;
}]


angular.module('about', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/aboutUs', {
			templateUrl: 'app/views/about/about.html',
			controller:  AboutCtl,
			controllerAs: 'ctrl'
		});
	}]);
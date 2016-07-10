angular.module('dziws', [
        'ngRoute',
        'home',
        'about'])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/home' });
	}]);

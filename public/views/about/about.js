'use strict';

angular.module('about', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/aboutUs', {
			templateUrl: 'views/about/about.html',
			controller:  'AboutCtl'
		});
	}])
	.controller('AboutCtl', function() {
		console.log('about controller');
		}
	);
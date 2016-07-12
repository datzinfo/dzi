'use strict';

var BlogCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}


angular.module('blog', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/blog', {
			templateUrl: 'views/blog/blog.html',
			controller:  BlogCtl,
			controllerAs: 'ctrl'
		});
	}]);
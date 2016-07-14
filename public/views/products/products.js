'use strict';

var ProductsCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}


angular.module('products', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/products', {
			templateUrl: 'views/products/products.html',
			controller:  ProductsCtl,
			controllerAs: 'ctrl'
		});
	}]);
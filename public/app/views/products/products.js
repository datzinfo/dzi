'use strict';

var ProductsCtl = ['$scope', 'messages', '$rootScope', function($scope, messages, $rootScope) {	
	$rootScope.activeView = 'service';

	var ctrl = this;
	ctrl.messages = messages;
}]


angular.module('products', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/products', {
			templateUrl: 'app/views/products/products.html',
			controller:  ProductsCtl,
			controllerAs: 'ctrl'
		});
	}]);
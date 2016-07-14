'use strict';

var AdminpanelCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
}


angular.module('adminpanel', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/adminpanel', {
			templateUrl: 'views/adminpanel/adminpanel.html',
			controller:  AdminpanelCtl,
			controllerAs: 'ctrl'
		});
	}]);
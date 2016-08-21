'use strict';

var ErrorCtl = ['$scope', '$routeParams', 'messages', 'Api', function($scope, $routeParams, messages, Api) {
	var ctrl = this;
	ctrl.messages = messages;
	
	ctrl.status =  $routeParams.code;
	ctrl.errMsg =  $routeParams.msg;
	ctrl.errStack = $routeParams.err;
}]


angular.module('error', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {	
		$routeProvider.when('/error/:err', {
			templateUrl: 'app/views/error/error.html',
			controller:  ErrorCtl,
			controllerAs: 'ctrl'
		});
	}]);
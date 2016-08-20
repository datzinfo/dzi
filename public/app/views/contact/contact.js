'use strict';

var ContactCtl = function($scope, messages, Api, $rootScope) {	
	$rootScope.activeView = 'contact';
	var ctrl = this;
	ctrl.messages = messages;
	
	ctrl.data = {};

	var onError = function(error) {
		ctrl.error = ctrl.messages.contact_got_msg;
	};
	var onSuccess = function(success) {
	};
	ctrl.submit = function(data) {
		Api.sendEmail(ctrl.data, onSuccess, onError);
		Api.addEnquiry(ctrl.data, onSuccess, onError);
	};	
}


angular.module('contact', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/contact', {
			templateUrl: 'app/views/contact/contact.html',
			controller:  ContactCtl,
			controllerAs: 'ctrl'
		});
	}]);
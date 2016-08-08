'use strict';

var ContactCtl = function($scope, messages, util, Api) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.data = {};
	
	var onError = function(error) {
		console.log(error);
	};
	var onSuccess = function(success) {
		console.log(success);
	};

	var submitCb = function() {
		console.log('MSG SENT');
	};
	ctrl.submit = function(data) {
		Api.sendEmail(ctrl.data, submitCb);
		Api.addEnquiry(ctrl.data, onSuccess, onError);
	};
	
	ctrl.submitText = "Submit";

	ctrl.displayMessage = function() {
		 ctrl.submitText = "Message sent";
	}
}


angular.module('contact', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/contact', {
			templateUrl: 'views/contact/contact.html',
			controller:  ContactCtl,
			controllerAs: 'ctrl'
		});
	}]);
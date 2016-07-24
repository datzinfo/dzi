'use strict';

var ContactCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.data = {};
	
	var submitCb = function() {
		console.log('MSG SENT');
	};
	ctrl.submit = function(data) {
		util.sendEmail(ctrl.data, submitCb);
		util.addEnquiry(ctrl.data);
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
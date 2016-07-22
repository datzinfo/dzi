'use strict';

var AdminpanelCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.data = {};
	
	populate(ctrl, util);
	save(ctrl, util);
	
	
	ctrl.isAuthenticated = false;
	ctrl.onSignIn = function() {
		ctrl.isAuthenticated = true;
	};
	
	ctrl.onclick = function() { 
		alert("Hello!")
	}
}

var populate = function(ctrl, util) {
	var onPopulate = function(data) {
	    ctrl.states = [];
		for (var i in data.states) {
			ctrl.states.push({ name: data.states[i], value: data.states[i]});
		}
		ctrl.state = ctrl.states[0]; // draft
		
		ctrl.categories = [];
		for (var i in data.categories) {
			ctrl.categories.push({ name: data.categories[i].type, value: data.categories[i].type});
		}
		ctrl.category = ctrl.categories[0];
	};
	
	var onError = function(error) {
		ctrl.errorMsg = error;
	};
	
	util.getAdminPanelData(onPopulate, onError);
}

var save = function(ctrl, util) {
	var onSuccess = function() {
		ctrl.errorMsg = '';
		ctrl.successMsg = "Your post has been saved.";
	};
	
	var onError = function(error) {
		ctrl.successMsg = '';
		ctrl.errorMsg = error;
	};
	
	ctrl.save = function(data) {
		ctrl.data.state = ctrl.state.value;
		ctrl.data.categoryType = ctrl.category.value;
		// FIXME
		ctrl.data.email = "michaelfung@datzinfo.com";
		util.addPost(ctrl.data, onSuccess, onError);
	};	
}

angular.module('adminpanel', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/adminpanel', {
			templateUrl: 'views/adminpanel/adminpanel.html',
			controller:  AdminpanelCtl,
			controllerAs: 'ctrl'
		});
	}]);
'use strict';

var BlogCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	var onSuccess = function(posts) {
//		console.log("Got-> " + JSON.stringify(posts));
	};
	var onError = function(error) {
//		console.log("Err-> " + error);
	};
	ctrl.data = {};
	ctrl.data.message = "Posting a comment";
	ctrl.data.email = "abc@xyz.com";
	ctrl.data.name = "I am ABC";
	ctrl.data.postId = '1';
	util.addComment(ctrl.data, onSuccess, onError);
//	ctrl.categoryType = "Business Intelligence";
//	ctrl.categoryType = "*";
//	util.getPosts(ctrl.categoryType, onSuccess, onError);
	util.getOnePost('1', onSuccess, onError);
}


angular.module('blog', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/blog', {
			templateUrl: 'views/blog/blog.html',
			controller:  BlogCtl,
			controllerAs: 'ctrl'
		});
	}]);

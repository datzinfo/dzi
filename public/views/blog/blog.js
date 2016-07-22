'use strict';

var BlogCtl = function($scope, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	// populate page
	var onPopulate = function(data) {
		console.log(JSON.stringify(data));
		ctrl.categories = data;
	};	
	var onError = function(error) {
		ctrl.errorMsg = error;
	};	
	var onSuccess = function(data) {
//		console.log("Got-> " + JSON.stringify(data));
		ctrl.posts = data;
	};

	util.getCategories(onPopulate, onError);	
	// populate all posts by default
	ctrl.categoryType = "*";
	util.getPosts(ctrl.categoryType, onSuccess, onError);
	
	// populate subviews
	ctrl.templates =
		    [ { name: 'blog-list', url: 'views/blog/blog-list.html'},
		      { name: 'blog-details', url: 'views/blog/blog-details.html'} ];
	ctrl.subview = ctrl.templates[0];	
	ctrl.onDetails = function(categoryId) {
		ctrl.categoryType = categoryId
		util.getPosts(ctrl.categoryType, onSuccess, onError);
		ctrl.subview = ctrl.templates[1];
	}	
	ctrl.onList = function(categoryId) {
		ctrl.categoryType = categoryId
		util.getPosts(ctrl.categoryType, onSuccess, onError);
		ctrl.subview = ctrl.templates[0];
	}
	
//	ctrl.data = {};
//	ctrl.data.message = "Posting a comment";
//	ctrl.data.email = "abc@xyz.com";
//	ctrl.data.name = "I am ABC";
//	ctrl.data.postId = '1';
//	util.addComment(ctrl.data, onSuccess, onError);
//	ctrl.categoryType = "Business Intelligence";
//	ctrl.categoryType = "*";
//	util.getOnePost('1', onSuccess, onError);
//	util.getPosts(ctrl.categoryType, onSuccess, onError);
}
//

angular.module('blog', ['ngRoute'])
	.config(['$routeProvider', '$compileProvider', '$sceDelegateProvider', function($routeProvider, $compileProvider, $sceDelegateProvider) {
		$routeProvider.when('/blog', {
			templateUrl: 'views/blog/blog.html',
			controller:  BlogCtl,
			controllerAs: 'ctrl'
		});
	}])
	.filter('trusted', ['$sce', function($sce) {
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}]);

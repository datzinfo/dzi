'use strict';

var BlogCtl = function($scope, $location, $anchorScroll, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.isCollapsed = false;
	
	// populate page
	var onPopulate = function(data) {
		ctrl.categories = data;
	};	
	var onError = function(error) {
		ctrl.errorMsg = error;
	};	

	util.getCategories(onPopulate, onError);	
	// populate all posts by default
	var onPostList = function(data) {
//		console.log("Got-> " + JSON.stringify(data));
		ctrl.posts = data;
		if (ctrl.posts && ctrl.posts.length == 0) {
			ctrl.noPost = "No post yet.";
		}
	};
	
	var onPostDetails = function(data) {
//		console.log("Got-> " + JSON.stringify(data));
		ctrl.details = data;
	};

	ctrl.categoryType = "*";
	util.getPosts(ctrl.categoryType, onPostList, onError);
	
	// populate subviews
	ctrl.templates =
		    [ { name: 'blog-list', url: 'views/blog/blog-list.html'},
		      { name: 'blog-details', url: 'views/blog/blog-details.html'} ];
	ctrl.subview = ctrl.templates[0];	
	
	ctrl.onDetails = function(postId) {
		util.getOnePost(postId, onPostDetails, onError);
		ctrl.subview = ctrl.templates[1];
	}	
	ctrl.onList = function(categoryId) {
		ctrl.categoryType = categoryId
		util.getPosts(ctrl.categoryType, onPostList, onError);
		ctrl.subview = ctrl.templates[0];
	}

	var onPostComment = function(comment) {
		ctrl.toggleAddComment();
		ctrl.details.comments.unshift(comment);
	}
	
	ctrl.comment = {};
	ctrl.addComment = function() {
		ctrl.comment.postId = ctrl.details.id;
		util.addComment(ctrl.comment, onPostComment, onError);
	}

	ctrl.modalShown = false;
	ctrl.toggleAddComment = function() {
	    ctrl.modalShown = !ctrl.modalShown;
		ctrl.comment = {};
	};
	  
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
	.filter('clipped', ['$sce', function($sce) {
		return function(html) {
		   var tmp = document.createElement("DIV");
		   tmp.innerHTML = html;
		   var plainText = tmp.textContent || tmp.innerText || "";
		   var idx = 150;
		   if (plainText.length > idx) {
			   while (idx < plainText.length && plainText[idx] != ' ') {
				   idx++
			   }
			   plainText = plainText.substr(0, idx) + '...';
		   }
		   return $sce.trustAsHtml(plainText);
		};
	}])
	.filter('trusted', ['$sce', function($sce) {
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}]);
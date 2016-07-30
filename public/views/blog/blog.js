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
		ctrl.posts = data;
	};
	
	var onPostDetails = function(data) {
		ctrl.details = data;
	};

	ctrl.categoryType = "*";
	util.getPosts(ctrl.categoryType, onPostList, onError);
	
	// populate subviews
	ctrl.templates =
		    [ { name: 'blog-list', url: 'views/blog/blog-list.html'},
		      { name: 'blog-details', url: 'views/blog/blog-details.html'} ];
	
	ctrl.switchView = function(idx) {
		ctrl.subview = ctrl.templates[idx];
	};

	ctrl.switchView(0);	
	
	ctrl.onDetails = function(postId) {
		util.getOnePost(postId, onPostDetails, onError);
		ctrl.switchView(1);
//		$location.hash('postDetails');
//        $anchorScroll();
	}
	
	ctrl.onList = function(categoryId) {
		ctrl.categoryType = categoryId
		util.getPosts(ctrl.categoryType, onPostList, onError);
		ctrl.switchView(0)
	}
  
	var onPostComment = function(comment) {
	    ctrl.replyShown = false;
		ctrl.details.comments.unshift(comment);
		ctrl.reply = {};
	}
	
	var onPostReply = function(reply) {
	    ctrl.replyShown = false;
		ctrl.reply.parent.replies.unshift(reply);
		angular.element(ctrl.reply.parentId).addClass('in');
		ctrl.reply = {};
	}
	
	ctrl.reply = {};
	ctrl.addReply = function() {
		if (ctrl.reply.postId) {
			util.addComment(ctrl.reply, onPostComment, onError);
		}
		else {
			util.addReply(ctrl.reply, onPostReply, onError);
		}
	}
	
	ctrl.reply.parent = [];
	ctrl.replyShown = false;
	ctrl.openAddReply = function(event, origin, level1, level2) {
		ctrl.replyShown = true;
		angular.element('.ng-modal-dialog').attr('style', 'position:fixed; top:25%; right:30%;');
		
		ctrl.reply = {};
		if (origin.commentId) {
			ctrl.reply.commentId = origin.commentId;
			ctrl.reply.parent = ctrl.details.comments[level1];
			ctrl.reply.parentId = "#replyList_"+level1;
		}
		else if (origin.replyId) {
			ctrl.reply.replyId = origin.replyId;
			ctrl.reply.parent = ctrl.details.comments[level1].replies[level2];
			ctrl.reply.parentId = "#replyList_"+level1+"_"+level2;
		}
		else if (origin.postId) {
			ctrl.reply.postId = origin.postId;
		}
	};
}

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
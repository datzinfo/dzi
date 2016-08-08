'use strict';

var BlogCtl = function($scope, $location, $anchorScroll, messages, util, Api) {
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

	Api.getCategories(onPopulate, onError);	
	// populate all posts by default
	var onPostList = function(data) {
		ctrl.posts = data;
	};
	
	var onPostDetails = function(data) {
		ctrl.details = data;
	};

	ctrl.filter = {'categoryId': '*', 'state': 'published'};
	Api.getPosts(ctrl.filter, onPostList, onError);
	
	// populate subviews
	ctrl.templates =
		    [ { name: 'blog-list', url: 'views/blog/blog-list.html'},
		      { name: 'blog-details', url: 'views/blog/blog-details.html'} ];
	
	ctrl.switchView = function(idx) {
		ctrl.subview = ctrl.templates[idx];
	};

	ctrl.switchView(0);	
	
	ctrl.onDetails = function(postId) {
		var params = { 'id' : postId, 'deleted' : false };
		Api.getOnePost(params, onPostDetails, onError);
		ctrl.switchView(1);
//		$location.hash('postDetails');
//        $anchorScroll();
	}
	
	ctrl.onList = function(categoryId) {
		ctrl.filter = {'categoryId': categoryId, 'state': 'published'};
		Api.getPosts(ctrl.filter, onPostList, onError);
		ctrl.switchView(0)
	}
  
	var onPostComment = function(comment) {
	    ctrl.replyShown = false;
		ctrl.details.comments.unshift(comment);
		ctrl.reply = {};
	}
	
	var onPostReply = function(reply) {
	    ctrl.replyShown = false;
	    if (ctrl.reply.parent.replies) {
			ctrl.reply.parent.replies.unshift(reply);	    	
	    }
	    else {
	    	ctrl.reply.parent.replies = [reply];
	    }
		angular.element(ctrl.reply.parentId).addClass('in');
		ctrl.reply = {};
	}
	
	ctrl.reply = {};
	ctrl.addReply = function() {
		if (ctrl.reply.email != undefined && ctrl.reply.email.length == 0) {
			// db validation would fail with empty string
			delete ctrl.reply['email'];
		}
		if (ctrl.reply.postId) {
			Api.addComment(ctrl.reply, onPostComment, onError);
		}
		else {
			Api.addReply(ctrl.reply, onPostReply, onError);
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
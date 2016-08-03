'use strict';

var AdminBlogListCtl = function($scope, $window, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.data = {};
	
	
	ctrl.isAuthenticated = false;
	ctrl.onSignIn = function() {
		ctrl.isAuthenticated = true;
	};
	
	//
	var onError = function(error) {
		ctrl.errorMsg = error;
	};	

	// populate all posts by default
	var onPostList = function(data) {
		ctrl.posts = data;
		if (ctrl.posts && ctrl.posts.length == 0) {
			ctrl.noPost = "No post yet.";
		}
	};
	
	ctrl.categoryId = {'categoryId': '*', 'state': '*'};
	util.getPosts(ctrl.categoryId, onPostList, onError);
}

var AdminpanelCtl = function($scope, $window, $routeParams, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.data = {};
	var postId = $routeParams.postId;
	
	populate(ctrl, util);
	save(ctrl, util);

	if (postId != -1) {
		var findSelection = function(arr, propName, propValue) {
			for (var i=0; i < arr.length; i++) {
				if (arr[i][propName] == propValue) {
					return arr[i];
				}
			}
		}
		
		var onError = function(error) {
			ctrl.errorMsg = error;
		};
		
		ctrl.data = {};
		var onPostDetails = function(data) {
			ctrl.data = data;
			ctrl.state = findSelection(ctrl.states, 'value', ctrl.data.state);
			ctrl.category = findSelection(ctrl.categories, 'value', ctrl.data.categoryId);
		};

		util.getOnePost(postId, onPostDetails, onError);	
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
			ctrl.categories.push({ name: data.categories[i].type, value: data.categories[i].id});
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
		if (ctrl.data.id) {
			ctrl.successMsg = "Your post has been updated.";
		}
		else {
			ctrl.successMsg = "Your post has been saved.";
		}
	};
	
	var onError = function(error) {
		ctrl.successMsg = '';
		ctrl.errorMsg = error;
	};
	
	ctrl.save = function(data) {
		ctrl.data.state = ctrl.state.value;
		ctrl.data.categoryId = ctrl.category.value;
		if (ctrl.data.id) {
			// update post
			util.updatePost(ctrl.data, onSuccess, onError);
		}
		else {
			// new post
			// FIXME
			ctrl.data.email = "michaelfung@datzinfo.com";
			util.addPost(ctrl.data, onSuccess, onError);
		}
	};	
}



var AdminBlogCommentsCtl = function($scope, $window, $routeParams, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.data = {};
	
	var postId = $routeParams.postId;
	
	//
	var onError = function(error) {
		ctrl.errorMsg = error;
	};	
	
	ctrl.comments = {};
	var onPostDetails = function(data) {
		ctrl.comments = data.comments;
	};

	util.getOnePost(postId, onPostDetails, onError);
	
	var onError = function(error) {
		ctrl.errorMsg = error;
	};
	
	var onDeleteComment = function(data) {
		console.log(">>>"+JSON.stringify(data));
		for (var i=0; i < ctrl.comments.length; i++) {
			if (ctrl.comments[i]['id'] == data.id) {
				ctrl.comments[i] = data;
			}
		}
//		ctrl.comments = data;
	};

	var commentData = {};
	ctrl.deleteComment = function(commentId, isDelete) {
		commentData.commentId = commentId;
		commentData.deleted = isDelete;
		util.deleteComment(commentData, onDeleteComment, onError);
	}

	var onDeleteReply = function(data) {
		console.log("Got-> " + JSON.stringify(data));
	};

	var replyData = {};
	ctrl.deleteReply = function(replyId, isDelete) {
		replyData.replyId = replyId;
		replyData.deleted = isDelete;
		util.deleteReply(replyData, onDeleteReply, onError);
	}

	var onUpdated = function() {
		ctrl.replyShown = false;
		ctrl.editing.writer = ctrl.reply.writer;
		ctrl.editing.message = ctrl.reply.message;
		ctrl.reply = {};
	}
	
	ctrl.reply = {};
	ctrl.updateReply = function() {
		if (ctrl.reply.postId) {
			util.updateComment(ctrl.reply, onUpdated, onError);
		}
		else {
			util.updateReply(ctrl.reply, onUpdated, onError);
		}
	}
	
	ctrl.replyShown = false;
	ctrl.editReply = function(origin) {
		ctrl.replyShown = true;
		angular.element('.ng-modal-dialog').attr('style', 'position:fixed; top:25%; right:30%;');
		
		var findReply = function(replies, replyId) {
			if (replies) {
				for (var i=0; i < replies.length; i++) {
					if (replies[i]['id'] === replyId) {
						return replies[i];
					}
					
					if (replies[i]['replies']) {
						var reply = findReply(replies[i]['replies'], replyId);
						if (reply) {
							return reply;
						}
					}
				}
			}
		};
		
		ctrl.editing = {};
		ctrl.reply = {};
		if (origin.commentId) {
			for (var i=0; i < ctrl.comments.length; i++) {
				if (ctrl.comments[i]['id'] === origin.commentId) {
					ctrl.editing = ctrl.comments[i];
					ctrl.reply = JSON.parse(JSON.stringify(ctrl.editing));
				}
			}
		}
		else if (origin.replyId) {
			for (var i=0; i < ctrl.comments.length; i++) {
				var reply = findReply(ctrl.comments[i].replies, origin.replyId);
				if (reply) {
					ctrl.editing = reply;
					ctrl.reply = JSON.parse(JSON.stringify(ctrl.editing));
				}
			}
		}
	};

}

angular.module('adminpanel', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/adminpanel/:postId', {
			templateUrl: 'views/adminpanel/adminpanel.html',
			controller:  AdminpanelCtl,
			controllerAs: 'ctrl'
		})
		.when('/adminbloglist', {
			templateUrl: 'views/adminpanel/adminBlogList.html',
			controller:  AdminBlogListCtl,
			controllerAs: 'ctrl'
		})
		.when('/adminblogcomments/:postId', {
			templateUrl: 'views/adminpanel/adminBlogComments.html',
			controller:  AdminBlogCommentsCtl,
			controllerAs: 'ctrl'
		});
	}]);
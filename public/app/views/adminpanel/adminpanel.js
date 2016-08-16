'use strict';

var AdminBlogListCtl = function($scope, $window, $location, messages, Admin, Api, AuthService) {
	var ctrl = this;
	ctrl.messages = messages;
	
	ctrl.data = {};
	
	ctrl.onError = function(error) {
		if (error && (error.status == 401 || error === "Unauthorized")) {
			AuthService.logout();
			ctrl.errorMsg = "Action failed because our login has expired or you are not authorized to perform the action.";
		}
		else {
			ctrl.errorMsg = error;
		}
	}

	ctrl.logout = function() {
		AuthService.logout().then(function(success) {
//			$location.path("/");
			$location.path("/login");
		});
	};
	
	// populate all posts by default
	var onPostList = function(data) {
		ctrl.posts = data;
		if (ctrl.posts && ctrl.posts.length == 0) {
			ctrl.noPost = "No post yet.";
		}
	};
	
	ctrl.categoryId = {'categoryId': '*', 'state': '*'};
	Api.getPosts(ctrl.categoryId, onPostList, ctrl.onError);
}

var AdminpanelCtl = function($scope, $window, $routeParams, messages,  Admin, Api, AuthService) {
	var ctrl = this;
	ctrl.messages = messages;
	
	ctrl.data = {};
	var postId = $routeParams.postId;
	
	ctrl.onError = function(error) {
		ctrl.successMsg = '';
		if (error && (error.status == 401 || error === "Unauthorized")) {
			AuthService.logout();
			ctrl.errorMsg = "Action failed because our login has expired or you are not authorized to perform the action.";
		}
		else {
			ctrl.errorMsg = error;
		}
	}

	populate(ctrl, Admin);
	save(ctrl, Admin);

	if (postId != -1) {
		var findSelection = function(arr, propName, propValue) {
			if (arr) {
				for (var i=0; i < arr.length; i++) {
					if (arr[i][propName] == propValue) {
						return arr[i];
					}
				}
			}
		}
		
		ctrl.data = {};
		var onPostDetails = function(data) {
			ctrl.data = data;
			ctrl.state = findSelection(ctrl.states, 'value', ctrl.data.state);
			ctrl.category = findSelection(ctrl.categories, 'value', ctrl.data.categoryId);
		};

		var params = { 'id' : postId, 'deleted' : true };
		Api.getOnePost(params, onPostDetails, ctrl.onError);	
	}
}

var populate = function(ctrl, Admin) {
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
	
	Admin.getAdminPanelData(onPopulate, ctrl.onError);
}

var save = function(ctrl, Admin) {
	var onSuccess = function() {
		ctrl.errorMsg = '';
		if (ctrl.data.id) {
			ctrl.successMsg = "Your post has been updated.";
		}
		else {
			ctrl.saved = true;
			ctrl.successMsg = "Your post has been saved. To edit this post, go to blog list.";
		}
	};
	
	ctrl.save = function(data) {
		ctrl.data.state = ctrl.state.value;
		ctrl.data.categoryId = ctrl.category.value;
		if (ctrl.data.id) {
			// update post
			Admin.updatePost(ctrl.data, onSuccess, ctrl.onError);
		}
		else {
			// new post
			// FIXME
			ctrl.data.email = "michaelfung@datzinfo.com";
			Admin.addPost(ctrl.data, onSuccess, ctrl.onError);
		}
	};	
}



var AdminBlogCommentsCtl = function($scope, $window, $routeParams, messages, Admin, Api, AuthService) {
	var ctrl = this;
	ctrl.messages = messages;
	
	var postId = $routeParams.postId;
	
	ctrl.onError = function(error) {
		ctrl.successMsg = '';
		if (error && (error.status == 401 || error === "Unauthorized")) {
			AuthService.logout();
			ctrl.errorMsg = "Action failed because our login has expired or you are not authorized to perform the action.";
		}
		else {
			ctrl.errorMsg = error;
		}
	}
	
	ctrl.comments = {};
	var onPostDetails = function(data) {
		ctrl.title = data.title;
		ctrl.comments = data.comments;
	};

	var params = { 'id' : postId, 'deleted' : true };
	Api.getOnePost(params, onPostDetails, ctrl.onError);
	
	var onDeleteComment = function(data) {
		for (var i=0; i < ctrl.comments.length; i++) {
			if (ctrl.comments[i]['id'] == data.id) {
				ctrl.comments[i] = data;
			}
		}
	};

	var commentData = {};
	ctrl.deleteComment = function(commentId, isDelete) {
		commentData.commentId = commentId;
		commentData.deleted = isDelete;
		Admin.deleteComment(commentData, onDeleteComment, ctrl.onError);
	}

	var onDeleteReply = function(data) {
		var updateReply = function(arr, replyId) {
			if (arr) {
				for (var i=0; i < arr.length; i++) {
					if (arr[i]['id'] === replyId) {
						arr[i] = data;
						return;
					}
					
					if (arr[i]['replies']) {
						updateReply(arr[i]['replies'], replyId);
					}
				}
			}
		};
		
		updateReply(ctrl.comments, data.id);
	};

	var replyData = {};
	ctrl.deleteReply = function(replyId, isDelete) {
		replyData.replyId = replyId;
		replyData.deleted = isDelete;
		Admin.deleteReply(replyData, onDeleteReply, ctrl.onError);
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
			Admin.updateComment(ctrl.reply, onUpdated, ctrl.onError);
		}
		else {
			Admin.updateReply(ctrl.reply, onUpdated, ctrl.onError);
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

	ctrl.expand = function(arrowId) {
		var elem = angular.element(arrowId);
		if (elem.hasClass('fa-arrow-down')) {
			elem.addClass('fa-arrow-up');
			elem.removeClass('fa-arrow-down');
		}
		else {
			elem.addClass('fa-arrow-down');
			elem.removeClass('fa-arrow-up');
		}
	}
}

angular.module('adminpanel', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/adminpanel/:postId', {
		    access: {
		    	loginRequired: true
		    },
			templateUrl: 'app/views/adminpanel/adminpanel.html',
			controller:  AdminpanelCtl,
			controllerAs: 'ctrl'
		})
		.when('/adminbloglist', {
		    access: {
		    	loginRequired: true
		    },
			templateUrl: 'app/views/adminpanel/adminBlogList.html',
			controller:  AdminBlogListCtl,
			controllerAs: 'ctrl'
		})
		.when('/adminblogcomments/:postId', {
		    access: {
		    	loginRequired: true
		    },
			templateUrl: 'app/views/adminpanel/adminBlogComments.html',
			controller:  AdminBlogCommentsCtl,
			controllerAs: 'ctrl'
		});
	}])
   .run(function($rootScope, $location, AuthService) {
	  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
		if ((nextRoute.access && nextRoute.access.loginRequired) && !AuthService.isAuthenticated()) {
	        event.preventDefault();
			$location.url("/login");
		}
	  })
   });
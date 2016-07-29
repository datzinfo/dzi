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
	
	ctrl.categoryType = '*';
	util.getPosts(ctrl.categoryType, onPostList, onError);
}

var AdminpanelCtl = function($scope, $window, $routeParams, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.data = {};
	var postId = $routeParams.postId;
	if (postId == -1) {
		populate(ctrl, util);
		save(ctrl, util);
	}
	else{
		var onError = function(error) {
			ctrl.errorMsg = error;
		};
		
		ctrl.data = {};
		var onPostDetails = function(data) {
			console.log("Got-> " + JSON.stringify(data));
			ctrl.data = data;
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
		console.log("Got-> " + JSON.stringify(data));
		ctrl.comments = data.comments;
	};

	util.getOnePost(postId, onPostDetails, onError);	

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
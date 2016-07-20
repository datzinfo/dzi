angular.module('dziws', [
        'ngRoute',
        'ngAnimate',
        'home',
        'about',
        'service',
        'consulting',
        'products',
        'support',
        'blog',
        'contact',
        'adminpanel',
        'ngWig'
        ])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $urlRouterProvider, $stateProvider) {
//		$routeProvider.otherwise({ redirectTo: '/' });
		$urlRouterProvider.otherwise('/');
//		 $stateProvider
//		    .state('blog.all', {
//		      url: "/blog",
//		      templateUrl: "views/blog/blog-all.html"
//		    })
//		    .state('blog.one', {
//		      url: "/blog",
//		      templateUrl: "views/blog/blog-one.html"
//		    });
	}])
	.service('util', ['$http', function($http) {

		var menuItems = ['Home', 'About Us', 'Services', 'Blog','Contact'];
		var activeMenu = menuItems[0];
	
		return {
			setActive: function(menuItem) {
				activeMenu = menuItem;
			},
			
			getActive: function() {
				return activeMenu;
			},
        	
        	sendEmail: function(emailData, callback) {
    	       $http({
    	    	   method  : 'POST',
    	    	   url     : '/sendEmail/',
    	    	   data    : $.param(emailData),  // pass in data as strings
    	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    	    	  })
          		.success(callback);
    	     },
    	     
         	addPost: function(postData, onSuccess, onError) {
     	       $http({
     	    	   method  : 'POST',
     	    	   url     : '/addPost/',
     	    	   data    : $.param(postData),  // pass in data as strings
     	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
     	    	  })
           		.success(onSuccess).error(onError);
     	     },
     	     
          	getPosts: function(categoryType, onSuccess, onError) {
      	       $http({
      	    	   method  : 'GET',
      	    	   url     : '/getPosts/',
      	    	   params  : { 'type' : categoryType }
      	    	  })
            	.success(onSuccess).error(onError);
      	     },
      	     
           	getOnePost: function(postId, onSuccess, onError) {
       	       $http({
       	    	   method  : 'GET',
       	    	   url     : '/getOnePost/',
       	    	   params  : { 'id' : postId }
       	    	  })
             	.success(onSuccess).error(onError);
       	     },
       	     
          	addComment: function(commentData, onSuccess, onError) {
      	       $http({
      	    	   method  : 'POST',
      	    	   url     : '/addComment/',
      	    	   data    : $.param(commentData),  // pass in data as strings
      	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
      	    	  })
            	.success(onSuccess).error(onError);
      	     },
            
      	     getAdminPanelData: function(onSuccess, onError) {
            	$http({
        	    	   method  : 'GET',
        	    	   url     : '/getAdminPanelData/',
         	    	  })
              	.success(onSuccess).error(onError);
      	     },
            	     
		};
	}]);

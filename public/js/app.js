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
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/' });
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
    	     }
		};
	}]);

angular.module('dziws', [
        'ngRoute',
        'home',
        'about',
        'service',
        'blog',
        'contact'
        ])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/home' });
	}])
	.service('util', [function () {

		var menuItems = ['Home', 'About Us', 'Services', 'Blog','Contact'];
		var activeMenu = menuItems[0];
	
		return {
			setActive: function(menuItem) {
				activeMenu = menuItem;
			},
			
			getActive: function() {
				return activeMenu;
			}
		};
	}]);

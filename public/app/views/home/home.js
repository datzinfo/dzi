'use strict';

var HomeCtl = function($scope, $interval, messages, $rootScope) {	
	$rootScope.activeView = 'home';

	var ctrl = this;
	ctrl.messages = messages;
	
	ctrl.slides = [
	                {image: 'images/slider-1.jpg', description: messages.index_slider1_title1},
	                {image: 'images/slider-2.jpg', description: messages.index_slider1_title2},
	                {image: 'images/slider-3.jpg', description: messages.index_slider2_title1}
	            ];
	
	ctrl.currentIndex = 0;
    ctrl.setCurrentSlideIndex = function (index) {
        ctrl.currentIndex = index;
    };
    ctrl.isCurrentSlideIndex = function(index) {
        return ctrl.currentIndex == index;
    };
    
    $interval(function () {
    	ctrl.gotoSlide(ctrl.currentIndex+1);
    }, 5000);
    
    ctrl.gotoSlide = function (index) {
    	if (index < 0) {
    		ctrl.currentIndex = ctrl.slides.length - 1;
    	}
    	else if (index > ctrl.slides.length - 1) {
    		ctrl.currentIndex = 0;
    	}
    	else{
    		ctrl.currentIndex = index;
    	}
    } 
}

angular.module('home', ['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/views/home/home.html',
			controller: HomeCtl,
			controllerAs: 'ctrl'
		});
	}]);
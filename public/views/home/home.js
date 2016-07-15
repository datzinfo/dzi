'use strict';

var HomeCtl = function($scope, $interval, messages, util) {
	var ctrl = this;
	ctrl.messages = messages;
	ctrl.util = util;
	
	ctrl.slides = [
	                {image: 'images/slider-1.jpg', description: messages.index_slider1_title1},
	                {image: 'images/slider-2.jpg', description: messages.index_slider1_title2},
	                {image: 'images/slider-3.jpg', description: messages.index_slider2_title1}
	            ];
	
	ctrl.currentIndex = 0;
    ctrl.setCurrentSlideIndex = function (index) {
        ctrl.currentIndex = index;
    };
    ctrl.isCurrentSlideIndex = function (index) {
        return ctrl.currentIndex === index;
    };
    
    $interval(function () {
    	if (ctrl.currentIndex < ctrl.slides.length-1) {
           	ctrl.currentIndex = ctrl.currentIndex + 1;
    	}
        else {
            ctrl.currentIndex =  0
     	}
    }, 5000);
}

angular.module('home', ['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/home/home.html',
			controller: HomeCtl,
			controllerAs: 'ctrl'
		});
	}]);
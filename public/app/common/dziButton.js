angular.module('dziws')
.directive("rotateBtn", function($timeout, messages) {
	
	var animate = function(scope, element) {
		var finishedMsg = scope.afterText;
		if (scope.errorText) {
			element.addClass('errorText');
			finishedMsg = scope.errorText;
		}
		element.attr('disabled', '')
		.html(finishedMsg).animate({
			borderSpacing : 360
		}, {
			step : function(now, fx) {
				$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
				$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
				$(this).css('-o-transform', 'rotate(' + now + 'deg)');
				$(this).css('transform', 'rotate(' + now + 'deg)');
			},
			duration : 'slow'
		}, 'linear');
	};
	
	return {
		restrict : "E",
		replace : true,
		scope : {
			beforeText : '@',
			afterText : '@',
			errorText : '@',
			clickFunc : '&'
		},
		template : "<button class='buttonGlow' ng-bind='beforeText'></button>",
		link : function(scope, element) {
			element.on('click', function() {
				if (scope.clickFunc) {
					var p = scope.clickFunc();
					$timeout(function () {
						animate(scope, element);
					}, 1000);
				}
				else {
					animate(scope, element);
				}
			});
		}
	};
})
.directive("flipBtn", function($timeout, messages) {
	
	var animate = function(scope, element) {
		scope.$apply(function() {
			var finishedMsg = scope.afterText;
			if (scope.errorText) {
				element.addClass('errorText');
				finishedMsg = scope.errorText;
			}
			element.attr('disabled', '')
			.addClass('buttonAnimate')
			.slideDown({
				duration : 500,
				easing : 'linear',
				complete : function() {
					element
					.slideUp({
						duration : 500,
						easing : 'linear',
						complete : function() {
							element.html(finishedMsg);
							element
							.removeClass('buttonAnimate')
							.slideDown({
								duration : 500,
								easing : 'linear'
							});
						}
					});
				}
			});
		});
	};
	
	return {
		restrict : "E",
		replace : true,
		scope : {
			beforeText : '@',
			afterText : '@',
			errorText : '@',
			clickFunc : '&'
		},
		template : "<button class='buttonGlow' ng-bind='beforeText'></button>",
		link : function(scope, element) {
			element.on('click', function() {
				if (scope.clickFunc) {
					var p = scope.clickFunc();
					$timeout(function () {
						animate(scope, element);
					}, 1000);
				}
				else {
					animate(scope, element);
				}
			});
		}
	};
})
.directive("fadeBtn", function($timeout, messages) {
	
	var animate = function(scope, element) {
		scope.$apply(function() {
			var finishedMsg = scope.afterText;
			if (scope.errorText) {
				element.addClass('errorText');
				finishedMsg = scope.errorText;
			}
			element.attr('disabled', '')
			.addClass('buttonAnimate')
			.fadeOut({
				duration : 500,
				easing : 'linear',
				complete : function() {
					element.html(finishedMsg);
					element
					.removeClass('buttonAnimate')
					.fadeIn({
						duration : 500,
						easing : 'linear'
					});
				}
			});
		});
	};
	
	return {
		restrict : "E",
		replace : true,
		scope : {
			beforeText : '@',
			afterText : '@',
			errorText : '@',
			clickFunc : '&'
		},
		template : "<button class='buttonGlow' ng-bind='beforeText'></button>",
		link : function(scope, element) {
			element.on('click', function() {
				if (scope.clickFunc) {
					var p = scope.clickFunc();
					$timeout(function () {
						animate(scope, element);
					}, 1000);
				}
				else {
					animate(scope, element);
				}
			});
		}
	};
});
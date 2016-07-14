   angular.module('ngWig').config(['ngWigToolbarProvider', function(ngWigToolbarProvider) {
    ngWigToolbarProvider.addCustomButton('forecolor', 'nw-forecolor-button');
  }])
  .component('nwForecolorButton', {
    template: '<button ng-click="onclick()" class="video-icon" title="video" ></button>',
    controller: function($scope) {
      $scope.onclick = function() {
    	  console.log("hellossss");
    	  alert("hello");
      }
    }
  });
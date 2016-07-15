   angular.module('ngWig').config(['ngWigToolbarProvider', function(ngWigToolbarProvider) {
    ngWigToolbarProvider.addCustomButton('video', 'video-button');
  }])
  .component('videoButton', {
    template: '<button ng-click="onclick()" class="video-icon" title="video" ></button>',
    controller: function($scope) {
      $scope.onclick = function() {
    	  pasteHtmlAtCaret("<h1>hello</h1>");
      }
    }
  });
var VideoCtl = function($scope) {
	var ctrl = this;
	ctrl.videoUrl = '';
	
    ctrl.onclick = function() {   	
    	pasteHtmlAtCaret(ctrl.videoUrl);
    }
 
};

angular.module('ngWig').config(['ngWigToolbarProvider', function(ngWigToolbarProvider) {
    ngWigToolbarProvider.addCustomButton('videoButton', 'video-button');
  }])
  .component('videoButton', {
    templateUrl: '/common/ngwig/custom.html',
	controller: VideoCtl,
	controllerAs: 'ctrl'
  });
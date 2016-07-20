var VideoCtl = function($scope) {
	var ctrl = this;
	ctrl.videoUrl = '';	
	
    ctrl.onclick = function() { 
    	if (ctrl.videoUrl){
    		var spot =  ctrl.videoUrl.replace('watch?v=', 'embed/');
    		var videolink = "<iframe width='420' height='315'"
				 +"src='" + spot + "'>"
				 +"</iframe>";
    		pasteHtmlAtCaret(videolink);
    	}
    	else{
    		alert ("No URL pasted")
    	}
    	
    
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
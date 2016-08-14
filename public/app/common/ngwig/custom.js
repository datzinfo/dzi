var VideoCtl = function($scope, $window) {
	var ctrl = this;
	ctrl.videoUrl = '';	
	
    ctrl.onclick = function() { 
    	if (ctrl.videoUrl){
    		var spot =  ctrl.videoUrl.replace('watch?v=', 'embed/');
    		var videolink = "<iframe width='420' height='315'"
				 +"src='" + spot + "'>"
				 +"</iframe>";
        	$window.document.getElementById("ng-wig-editable").focus();
    		pasteHtmlAtCaret(videolink);
    		ctrl.videoUrl = '';
    	}
    	else{
    		alert ("No URL pasted")
    	}
    	
    
    }
 
};

var ImgCtl = function($scope, $window) {
	var ctrl2 = this;
	ctrl2.imgUrl = '';	
	
	ctrl2.onclick = function() { 
    	if (ctrl2.imgUrl){
    		var imagelink = "<img src='" + ctrl2.imgUrl + "'"
    						+ "style='width:304px;height:228px;'>";
    		
           	$window.document.getElementById("ng-wig-editable").focus();
    		pasteHtmlAtCaret(imagelink);
    	}
    	else{
    		alert ("No URL pasted")
    	}
    	
    
    }
 
};

angular.module('ngWig').config(['ngWigToolbarProvider', function(ngWigToolbarProvider) {
    ngWigToolbarProvider.addCustomButton('videoButton', 'video-button');
    ngWigToolbarProvider.addCustomButton('imgButton', 'img-button');

  }])
  .component('videoButton', {
    templateUrl: 'app/common/ngwig/custom.html',
	controller: VideoCtl,
	controllerAs: 'ctrl'
  })
  .component('imgButton', {
    templateUrl: 'app/common/ngwig/img.html',
	controller: ImgCtl,
	controllerAs: 'ctrl2'
  });
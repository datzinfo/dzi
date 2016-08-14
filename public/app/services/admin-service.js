angular.module('dziws')

.service('Admin', ['$http', function($http) {

	return {

     	addPost: function(postData, onSuccess, onError) {
  	       $http({
  	    	   method  : 'POST',
  	    	   url     : '/admin/addPost/',
  	    	   data    : $.param(postData),  // pass in data as strings
  	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  	    	  })
  	    	  .success(onSuccess).error(onError);
  	     },
  	     
      	updatePost: function(postData, onSuccess, onError) {
  	       $http({
  	    	   method  : 'POST',
  	    	   url     : '/admin/updatePost/',
  	    	   data    : $.param(postData),  // pass in data as strings
  	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  	    	  })
  	    	  .success(onSuccess).error(onError);
  	     },
  	     
      	 updateComment: function(commentData, onSuccess, onError) {
   	       $http({
   	    	   method  : 'POST',
   	    	   url     : '/admin/updateComment/',
   	    	   data    : $.param(commentData),  // pass in data as strings
   	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
   	    	  })
         	.success(onSuccess).error(onError);
   	     },
         
  	     getAdminPanelData: function(onSuccess, onError) {
        	$http({
        		method  : 'GET',
        		url     : '/admin/getAdminPanelData/',
        	})
          	.success(onSuccess).error(onError);
  	     },
  	     
      	 updateReply: function(replyData, onSuccess, onError) {
			$http({
				method  : 'POST',
				url     : '/admin/updateReply/',
				data    : $.param(replyData),  // pass in data as strings
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
			})
           	.success(onSuccess).error(onError);
     	},
           
       	deleteReply: function(replyData, onSuccess, onError) {
   	       $http({
   	    	   method  : 'POST',
   	    	   url     : '/admin/deleteReply/',
  	    	   data    : $.param(replyData),  // pass in data as strings
   	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
   	    	  })
   	    	 .success(onSuccess).error(onError);
   	     },
	     
    	deleteComment: function(commentData, onSuccess, onError) {
	       $http({
	    	   method  : 'POST',
	    	   url     : '/admin/deleteComment/',
	    	   data    : $.param(commentData),  // pass in data as strings
	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
	    	  })
	    	 .success(onSuccess).error(onError);
	     },
	};
}]);

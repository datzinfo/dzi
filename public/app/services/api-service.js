angular.module('dziws')

.service('Api', ['$http', function($http) {

	return {

		sendEmail: function(emailData, onSuccess, onError) {
	       $http({
	    	   method  : 'POST',
	    	   url     : '/api/sendEmail/',
	    	   data    : $.param(emailData),  // pass in data as strings
	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	       })
	       .success(onSuccess).error(onError);
		},
	     
      	addEnquiry: function(enquiryData, onSuccess, onError) {
  	       $http({
  	    	   method  : 'POST',
  	    	   url     : '/api/addEnquiry/',
  	    	   data    : $.param(enquiryData),  // pass in data as strings
  	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  	       })
  	       .success(onSuccess).error(onError);
      	},
  	     
      	getPosts: function(params, onSuccess, onError) {
  	       $http({
  	    	   method  : 'GET',
  	    	   url     : '/api/getPosts/',
  	    	   params  : params
  	       })
  	       .success(onSuccess).error(onError);
      	},
  	     
       	getOnePost: function(params, onSuccess, onError) {
   	       $http({
   	    	   method  : 'GET',
   	    	   url     : '/api/getOnePost/',
   	    	   params  : params
   	       })
   	       .success(onSuccess).error(onError);
       	},
   	     
      	addComment: function(commentData, onSuccess, onError) {
  	       $http({
  	    	   method  : 'POST',
  	    	   url     : '/api/addComment/',
  	    	   data    : $.param(commentData),  // pass in data as strings
  	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  	       })
  	       .success(onSuccess).error(onError);
      	},
  	     
      	getCategories: function(onSuccess, onError) {
        	$http({
        		method  : 'GET',
        		url     : '/api/getCategories/',
        	})
          	.success(onSuccess).error(onError);
  	     },
  	     
      	 addReply: function(replyData, onSuccess, onError) {
  	       $http({
  	    	   method  : 'POST',
  	    	   url     : '/api/addReply/',
  	    	   data    : $.param(replyData),  // pass in data as strings
  	    	   headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  	       })
  	       .success(onSuccess).error(onError);
  	     }
	};
}]);

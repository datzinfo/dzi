angular.module('dziws')

.constant('AUTH_EVENTS', {
	notAuthenticated : 'auth-not-authenticated'
})

.service('AuthService', ['$q', '$http', function($q, $http) {
	var LOCAL_TOKEN_KEY = 'secret';
	var isAuthenticated = false;
	var authToken;

	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (token) {
			useCredentials(token);
		}
	}

	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	}

	function useCredentials(token) {
		isAuthenticated = true;
		authToken = token;

		// Set the token as header for your requests!
		$http.defaults.headers.common.Authorization = authToken;
	}

	function destroyUserCredentials() {
		authToken = undefined;
		isAuthenticated = false;
		$http.defaults.headers.common.Authorization = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	}

	var login = function(loginData, onSuccess, onError) {
		$http({
			method : 'POST',
			url : '/auth/',
			data : $.param(loginData), // pass in data as strings
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(result) {
			storeUserCredentials(result.token);
			onSuccess(result.success)
		}).error(onError);
	};

	var logout = function() {
		return $q(function(resolve, reject) {
			destroyUserCredentials();
			resolve('done logout');
		});
	};

	loadUserCredentials();

	return {
		login : login,
		logout : logout,
		isAuthenticated : function() {
			return isAuthenticated;
		}
	};
}])

.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function($rootScope, $q, AUTH_EVENTS) {
	return {
		responseError : function(response) {
			$rootScope.$broadcast({
				401 : AUTH_EVENTS.notAuthenticated,
			}[response.status], response);
			return $q.reject(response);
		}
	};
}])

.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}]);
angular.module('tstorm.services', [])
.factory('APIEndpointFactory', function(){
	var FORECAST_KEY = "e9c1ad11607e21727aa61fa08fa79455";
	var APIendpoint = function(lat, lng, units) {
		var base = "http://localhost:5000/mock/";
		var opts = lat + "/" + lng + "/" + units;
		return base + FORECAST_KEY + "/" + opts;
	};
	return (APIendpoint);
})

.factory('CurrentWxService', function($rootScope, $http, $ionicLoading, APIEndpointFactory){
	var weather = function(lat, lng, units) {
		this.initialize = function() {
			var url = APIEndpointFactory(lat, lng, units||"auto");
			var wxData = $http.get(url);
			var self = this;
			
			wxData.success(function(data){
				angular.extend(self, data);
			}).error(function(data, status){
				this.error = status;
				$ionicLoading.hide();
			});
		}; 
		this.initialize();
	};
	
	return (weather);
});


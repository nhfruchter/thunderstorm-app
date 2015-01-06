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
})

.factory('IconFactory', function(){
	var getIcon = function(name) {
		// [key => value] -> [fcIO icon => ionicon]
		var mapping = {
			"clear-day": 'ion-ios7-sunny-outline',
			"clear-night": 'ion-ios-moon-outline',
			"rain": 'ion-ios7-rainy-outline',
			"snow": 'ion-ios7-snowy',
			"sleet": 'ion-ios7-snowy',
			"wind": 'ion-leaf',
			"fog": 'ion-ios7-cloud-outline',
			"cloudy": 'ion-ios7-cloud-outline',
			"partly-cloudy-day": 'ion-ios7-partlysunny-outline',
			"partly-cloudy-night": 'ion-ios7-cloudy-night-outline'
		};
		return mapping.hasOwnProperty(name) ? mapping[name] : null;
	};
	
	return (getIcon);
});


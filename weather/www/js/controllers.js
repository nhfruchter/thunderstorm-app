angular.module('tstorm.controllers', [])

.controller('HomeCtrl', function($scope, $http, $ionicLoading, FORECAST_KEY) {
	$scope.weather = {};
	
	$scope.APIendpoint = function(lat, lng, units) {
		var base = "http://localhost:5000/mock/";
		var opts = lat + "/" + lng + "/" + units;
		return base + FORECAST_KEY + "/" + opts;
	};
	$scope.getWeather = function(lat, lng, units) {
		$scope.loading = true;
		var url = $scope.APIendpoint(30.25499, -97.774, "auto");
		$http.get(url)
		.success(function(data, status){
			$scope.weather = data;
		})
		.error(function(data, status, headers, config){
			$scope.error = status;
			$ionicLoading.hide();
		});
	};

	$scope.getIcon = function(name) {
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
	
	$scope.getWeather();
})
.controller('ForecastCtrl', function($scope, $localstorage) {
	 
})
.controller('SettingsCtrl', function($scope, $localstorage) {
	$scope.settings = {
		units: 'auto',
		geo: true 
	} || $localstorage.getObject('settings');
});

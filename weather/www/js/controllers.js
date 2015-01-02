angular.module('tstorm.controllers', [])

.controller('HomeCtrl', function($scope, $http, $ionicLoading, FORECAST_KEY) {
	$scope.weather = {};
	
	$scope.APIendpoint = function(lat, lng, units) {
		var base = "https://tstorm-wx-proxy.herokuapp.com/mock/";
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

	$scope.getWeather();
})

.controller('SettingsCtrl', function($scope, $localstorage) {
	$scope.settings = {
		units: 'auto',
		geo: true 
	} || $localstorage.getObject('settings');
});

angular.module('tstorm.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, IconFactory, HeadingToDirection, Loader) {
	$scope.getIcon = IconFactory;
	$scope.heading = HeadingToDirection;
	$scope.precipRound = function(x) {
		return Math.round(x/10)*10;
	};
	$scope.load = function() {
		Loader();
	};
	
	$scope.$on('Location.error', function(event, args){
		$scope.locating = -1;
		$scope.locationError = args;
	});
	
	$scope.$on('Location.coords', function(){
		Loader();
		$scope.locating = false;
	});
	$scope.$on('Location.locating', function(){
		$scope.locating = true;
	});
	
	$scope.load();
})
.controller('ForecastCtrl', function($rootScope, $scope, IconFactory, Loader) {

	$scope.getIcon = IconFactory;
	
	$scope.load = function() {
		Loader();
	}
	
	$scope.$on('Location.error', function(event, args){
		$scope.locating = -1;
		$scope.locationError = args;
	});
	$scope.$on('Location.coords', function(){
		Loader();
		$scope.locating = false;
	});
	$scope.$on('Location.locating', function(){
		$scope.locating = true;
	});

	$scope.load();
	
})
.controller('AlertsCtrl', function($rootScope, $scope) {
	// Nothing right now.
})
.controller('SettingsCtrl', function($rootScope, $scope, $appsettings, GeoSetter) {
	$scope.settings = {
		units: 'auto',
		geo: true 
	} || $appsettings.get();
	
	$scope.customLocation = {};
	
});

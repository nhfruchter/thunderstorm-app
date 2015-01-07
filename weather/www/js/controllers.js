angular.module('tstorm.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, IconFactory, HeadingToDirection, Loader) {
	$scope.getIcon = IconFactory;
	$scope.heading = HeadingToDirection;
	$scope.precipRound = function(x) {
		return Math.round(x/10)*10;
	};
	
	$scope.$on('Location.coords', function(){
		Loader();
		$scope.locating = false;
	});
	$scope.$on('Location.locating', function(){
		$scope.locating = true;
	});
	Loader();
})
.controller('ForecastCtrl', function($rootScope, $scope, IconFactory, Loader) {

	$scope.getIcon = IconFactory;
	
	$scope.$on('Location.coords', function(){
		Loader();
		$scope.locating = false;
	});
	$scope.$on('Location.locating', function(){
		$scope.locating = true;
	});
	Loader();
	
})
.controller('AlertsCtrl', function($rootScope, $scope) {
	// Nothing right now.
})
.controller('SettingsCtrl', function($rootScope, $scope, $appsettings, GeoSetter) {
	$scope.settings = {
		units: 'auto',
		geo: true 
	} || $appsettings.get();
	$scope.locate = GeoSetter;
});

angular.module('tstorm.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, CurrentWxService, IconFactory, HeadingToDirection) {
	$scope.load = function() {
		$rootScope.weather = new CurrentWxService(30, -97);		
		$scope.geo = "Austin, TX";		
	};	
	$scope.getIcon = IconFactory;
	$scope.heading = HeadingToDirection;
	$scope.load();
})
.controller('ForecastCtrl', function($rootScope, $scope, $localstorage, IconFactory) {
	$scope.precipRound = function(x) {
		return Math.round(x/10)*10;
	}
	$scope.getIcon = IconFactory;
})
.controller('AlertsCtrl', function($rootScope, $scope) {
	return;
})
.controller('SettingsCtrl', function($scope, $localstorage) {
	$scope.settings = {
		units: 'auto',
		geo: true 
	} || $localstorage.getObject('settings');
});

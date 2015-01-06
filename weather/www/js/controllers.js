angular.module('tstorm.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, CurrentWxService, IconFactory) {
	$rootScope.weather = new CurrentWxService(30, -97);
	$scope.getIcon = IconFactory;
	$scope.geo = "Austin, TX";
})
.controller('ForecastCtrl', function($rootScope, $scope, $localstorage, IconFactory) {
	$scope.precipRound = function(x) {
		return Math.round(x/10)*10;
	}
	$scope.getIcon = IconFactory;
})
.controller('SettingsCtrl', function($scope, $localstorage) {
	$scope.settings = {
		units: 'auto',
		geo: true 
	} || $localstorage.getObject('settings');
});

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
.controller('AlertsCtrl', function($rootScope, $scope) {
	// Nothing right now.
})
.controller('SettingsCtrl', function($rootScope, $scope, $appsettings, GeoSetter) {
	$scope.initSettings = function() {
		if ( !$appsettings.get('thunderstorm') ) {
			$appsettings.set('thunderstorm', true);
			$appsettings.set('units', 'auto');
			$appsettings.set('geo', true);
			$appsettings.set('customLocation', null);
		}
		if ( $appsettings.get('geo') === false && $appsettings.get('customLocation') === null ) {
			$appsettings.set('geo', true)
		}
		$scope.settings = $appsettings.get();		
		$scope.initAutocomplete();
	};
	$scope.initAutocomplete = function() {
		$scope.autocomplete = {
			options: { types: '(regions)' },
			details: '',
			text: $scope.settings.customLocation ? $scope.settings.customLocation.name : ''
		};			
	};
	
	$scope.save = function(key, value) { 
		if ( key == 'location' ) {
			$appsettings.set('customLocation', {
				name: $scope.autocomplete.text,
				coords: [$scope.autocomplete.details.geometry.location.k, $scope.autocomplete.details.geometry.location.D]
			});
		} else {	
			if ( key == 'geo' && value === true ) {
				$appsettings.set('customLocation', null);
				$scope.autocomplete.text = '';
			}
			$appsettings.set(key, value);			
		}
	};
		
	$scope.initSettings();
	
});

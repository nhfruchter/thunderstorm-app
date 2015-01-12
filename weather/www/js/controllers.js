angular.module('tstorm.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, $appsettings, IconFactory, HeadingToDirection, Loader) {
	$scope.getIcon = IconFactory;
	$scope.heading = HeadingToDirection;
	$scope.precipRound = function(x) {
		return Math.round(x/10)*10;
	};
	$scope.load = function() {
		Loader();
		$scope.units = $appsettings.get('units');
		if ( $scope.units == 'auto' ) {
			delete $scope.units;
		}
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
.controller('SettingsCtrl', function($rootScope, $scope, $appsettings) {
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
		if ( $appsettings.get('geo') === false && $appsettings.get('customLocation') !== null ) {
			$scope.settings.justSaved = true;
		}
		$scope.initAutocomplete();
	};
	
	$scope.initAutocomplete = function() {
		$scope.autocomplete = {
			options: { types: '(regions)' },
			details: '',
			text: $scope.settings.customLocation ? $scope.settings.customLocation.name : ''
		};			
	};
	
	$scope.toggleSave = function() {
		if (typeof($scope.settings.justSaved) !== 'undefined') {			
			$scope.settings.justSaved = !$scope.settings.justSaved;
		}
	};
	
	$scope.save = function(key, value) { 
		if ( key == 'location' ) {
			// Set location.
			$appsettings.set('customLocation', {
				name: $scope.autocomplete.text,
				coords: [$scope.autocomplete.details.geometry.location.k, $scope.autocomplete.details.geometry.location.D]
			});
			// Toggle save button display.
			$scope.settings.justSaved = true;
			// Save location data to global scope.
			$rootScope.currentLocation = $appsettings.get('customLocation');	
			// Clear weather if it exists.
			delete $rootScope.weather;
			
		} else {	
			if ( key == 'geo' && value === true ) {
				$appsettings.set('customLocation', null);
				$scope.autocomplete.text = '';
				delete $rootScope.weather;
				delete $rootScope.currentLocation;
				$rootScope.geoSettingsChanged = true;
			}
			$appsettings.set(key, value);			
		}
	};
		
	$scope.initSettings();
	
});

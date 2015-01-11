angular.module('tstorm.services', [])
.factory('$appsettings', function($localstorage){
	var _get = function(key) { 
		return $localstorage.getObject('settings')[key];
	};
	
	var _set = function(key, value) {
		var _settings = $localstorage.getObject('settings')
		_settings[key] = value;
		$localstorage.setObject('settings', _settings);
	};
	
	return {
		get: _get,
		set: _set
	}
})

.factory('APIEndpointFactory', function(){
	var FORECAST_KEY = "e9c1ad11607e21727aa61fa08fa79455";
	var APIendpoint = function(lat, lng, units) {
		// var base = "http://tstorm-wx-proxy.herokuapp.com/";
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
				self.next24 = data.next24.slice(1,25)
				$rootScope.$broadcast('scroll.refreshComplete');
			}).error(function(data, status){
				self.error = status;
				$ionicLoading.hide();
			});
		}; 
		this.initialize();
	};
	
	return (weather);
})

.factory('GeoSetter', function($rootScope, Geo) {
	var locate = function(){
		console.log("locating...");
		$rootScope.$broadcast('Location.locating');
		Geo.getLocation().then(function(position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			$rootScope.currentLocation = {
				coords: [lat, lng]
			};
			$rootScope.$broadcast('Location.coords');
			Geo.reverseGeocode(lat, lng).then(function(readableLoc){
				$rootScope.currentLocation.name = readableLoc;
				$rootScope.$broadcast('Location.reversed');				
			});
		}, function(error) {
			var geoErrors = {
				1: "You didn't allow access to your location.",
				2: "Current position unavailable.",
				3: "The location request timed out."
			};

			// navigator.notification.alert(geoErrors[error.code], null, "Location error");
			$rootScope.$broadcast('Location.error', geoErrors[error.code]);
		});
	};

	return (locate);
})

.factory('Loader', function($rootScope, $appsettings, GeoSetter, CurrentWxService){
	var load = function() {
		if ( !$rootScope.currentLocation || !$rootScope.currentLocation.coords ) {
			GeoSetter();				
		} else {
			delete $rootScope.weather;
			$rootScope.weather = new CurrentWxService($rootScope.currentLocation.coords[0], 
													  $rootScope.currentLocation.coords[1],
													  $appsettings.get('units'));				
		}
	};	
	
	return (load);
});

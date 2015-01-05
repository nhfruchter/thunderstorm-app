angular.module('tstorm.services', [])

.factory('CurrentWxService', function($http, $resource){
	return {
		weather: {},
		getWeather: function(lat, lng, units) {
			return;
		}
	};
});


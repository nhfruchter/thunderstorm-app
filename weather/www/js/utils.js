angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('HeadingToDirection', function(){
	var h2d = function(h) {
		/**
		 * Converts a heading in degrees to a cardinal direction.
		 * @param {integer} h - The heading [0,360] inclusive.
		 * @returns One of {north|east|south|west}, optionally compounded, or null.
		 */
	
		if ( 0 <= h && h < 45 ) {
			return "north";
		} else if ( 45 <= h && h < 90 ) {
			return "northeast";
		} else if ( 90 <= h && h < 135 ) {
			return "east";
		} else if ( 135 <= h && h < 180 ) {
			return "southeast";
		} else if ( 180 <= h && h < 225 ) {
			return "south";
		} else if ( 225 <= h && h < 270 ) {
			return "southwest";
		} else if ( 270 <= h && h < 315 ) {
			return "west";
		} else if ( 315 <= h && h < 360 ) {
			return "northwest";
		} else {
			return null;
		}
	}
	return (h2d);
})

.factory('IconFactory', function(){
	var getIcon = function(name) {
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
	
	return (getIcon);
});


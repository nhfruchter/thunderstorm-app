angular.module('tstorm', ['ionic', 'ionic.utils', 'tstorm.controllers', 'tstorm.services', 'ngAutocomplete'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($urlRouterProvider, $urlRouterProvider, $httpProvider, $stateProvider, $ionicConfigProvider) {

	$ionicConfigProvider.views.maxCache(3);

  $stateProvider
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  
  .state('tab.forecast', {
	  url: '/forecast',
	  views: {
		  'tab-forecast': {
			  templateUrl: 'templates/tab-forecast.html',
			  controller: 'HomeCtrl'
		  }
	  }
  })
  
  .state('tab.wxalerts', {
	  url: '/wxalerts',
	  views: {
		  'tab-wxalerts': {
			  templateUrl: 'templates/tab-wxalerts.html',
			  controller: 'AlertsCtrl'
		  }
	  }
  })
  
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  
  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');
  
  // AJAX loading screen
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    };
  });
	
})
.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'loading...', delay: 125})
  });

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  });
});

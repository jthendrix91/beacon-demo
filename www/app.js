angular.module('co.tython.beacon.demo', [
	'ionic',
	'ngCordova',
	'co.tython.beacon.demo.home',
	'co.tython.beacon.demo.ranging',
	'co.tython.beacon.demo.monitoring',
	'co.tython.beacon.demo.eventlog'
]).config(function ($stateProvider, $urlRouterProvider) {

	window.console.debug('Configuring co.tython.beacon.demo');

	$stateProvider
		.state('home', {
			url: '/home',
			views: {
				'home': {
					templateUrl: 'home/Home.html',
					controller: 'HomeCtrl'
				}
			}
		})

		.state('ranging', {
			url: '/ranging',
			views: {
				'ranging': {
					templateUrl: 'ranging/Ranging.html',
					controller: 'RangingCtrl'
				}
			}
		})

		.state('monitoring', {
			url: '/monitoring',
			views: {
				'monitoring': {
					templateUrl: 'monitoring/Monitoring.html',
					controller: 'MonitoringCtrl'
				}
			}
		})

		.state('eventlog', {
			url: '/eventlog',
			views: {
				'eventlog': {
					templateUrl: 'eventlog/EventLog.html',
					controller: 'EventLogCtrl'
				}
			}
		})

	$urlRouterProvider.otherwise('/home');

}).run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
	console.debug('Running co.tython.beacon.demo');

	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    // OneSignal Push Notification Setup
    var notificationOpenedCallback = function(jsonData) {
    	console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  	};
    window.plugins.OneSignal
    	.startInit("YOUR_ONESIGNAL_APPID")
    	.handleNotificationOpened(notificationOpenedCallback)
    	.endInit();

  });
});

window.ionic.Platform.ready(function () {
	angular.bootstrap(document, ['co.tython.beacon.demo']);
});

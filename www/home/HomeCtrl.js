angular.module('co.tython.beacon.demo.home').controller('HomeCtrl', ['$http', '$ionicPopup', '$log', '$scope', '$rootScope', '$localForage', '$cordovaLocalNotification', '$timeout', function ($http, $ionicPopup, $log, $scope, $rootScope, $localForage, $cordovaLocalNotification, $timeout) {

	$log.debug('HomeCtrl is loaded.');

	// Insert your custom REST Url here
	var restUrl = '';
	// Mock customer id using Salesforce contact id
	var contactId = '';	
	var regionInfo;	

	var alertPopup = function(elem){
		$ionicPopup.alert({
		    title: elem.Name,
		    template: elem.Description
		});
	}

	var callout = function(type, region){
		// Provide identifying info upon entering beacon region for tracking purposes		
		regionInfo = ( type === 'Entered' && typeof region !== 'undefined') ? '&uuid=' + region.uuid + '&major=' + region.major + '&minor=' + region.minor + '&identifier=' + region.identifier + '&type=' + type.toLowerCase() : '';		
		$http.get(restUrl + '?contactId=' + contactId + regionInfo)
			.then(function(response)
			{
				if (response && type === 'popup'){
					alertPopup(response.data)
						.then(function(res){
							// Closed
						});
				}
			});
	}	

	$scope.event = 'Waiting...';
	$scope.icon = 'ion-ios-clock-outline';

	$rootScope.regionEntered = false;
	$rootScope.regionExited = false;
	$rootScope.proximityImmediate = false;
	$rootScope.salesforceMode = {
		title : 'Salesforce Mode',
		enabled : false
	};

	$scope.resetStatusVariables = function () {
		$rootScope.regionEntered = false;
		$rootScope.regionExited = false;
		$rootScope.proximityImmediate = false;
	};

	$scope.updateMonitoringEvent = function () {
		$log.debug('updateMonitoringEvent()');

		$localForage.getItem('monitoring_event').then(function (monitoringEvent) {
			if (monitoringEvent.region) {
				if (monitoringEvent.state === 'CLRegionStateInside'){
					$scope.event = 'In range!';
					$scope.icon = 'ion-eye';
					$scope.regionStatus = 'Entered';
				}
				else {
					$scope.event = 'Out of range :-(';
					$scope.icon = 'ion-eye-disabled';
					$scope.regionStatus = 'Exited';					
				}
				if ($rootScope.salesforceMode.enabled === true && $scope.regionStatus === 'Entered' && $rootScope.regionEntered === false){					
					callout($scope.regionStatus, monitoringEvent.region);
					$rootScope.regionEntered = true;
				}
				else if ($rootScope.salesforceMode.enabled === true && $scope.regionStatus === 'Exited' && $rootScope.regionExited === false){
					callout($scope.regionStatus);				
					$rootScope.regionExited = true;
				}
			}						
		});
	};

	$scope.updateRangingEvent = function () {
		
		$log.debug('updateRangingEvent()');

		$localForage.getItem('ranging_event').then(function (rangingEvent) {			
			if (rangingEvent.beacons && rangingEvent.beacons[0]) {
				$scope.event = rangingEvent.beacons[0].proximity;
				if ($scope.event === 'ProximityImmediate'){
					$scope.icon = 'ion-volume-high';
					if ($rootScope.proximityImmediate === false && $rootScope.salesforceMode.enabled === true){
						callout('popup');
						$rootScope.proximityImmediate = true;
					}				
				}
				else if ($scope.event === 'ProximityNear'){
					$scope.icon = 'ion-volume-medium';
				}
				else if ($scope.event === 'ProximityFar'){
					$scope.icon = 'ion-volume-low';
				}
				else {
					// Unknown
					$scope.icon = 'ion-ios-help-outline';
				}
			}			
		});
	};

	$log.debug('Subscribing for updates of monitoring events.');
	$scope.$on('updated_monitoring_event', $scope.updateMonitoringEvent);

	$log.debug('Subscribing for updates of ranging events.');
	$scope.$on('updated_ranging_event', $scope.updateRangingEvent);

}]);
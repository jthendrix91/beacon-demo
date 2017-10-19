angular.module('co.tython.beacon.demo.home').controller('HomeCtrl', ['$log', '$scope', '$localForage', '$cordovaLocalNotification', function ($log, $scope, $localForage, $cordovaLocalNotification) {

	$log.debug('HomeCtrl is loaded.');

	$scope.event = 'Waiting...';
	$scope.icon = 'ion-ios-clock-outline';

	$scope.sendPush = function(pushMessage,pushTitle) {
        var notificationTime = new Date();
        $cordovaLocalNotification.schedule({
            text: pushMessage,
            title: pushTitle,
            sound: "file://sounds/beep.caf"
        }).then(function () {
            console.log("The notification has been sent");
        });
    };

	$scope.updateMonitoringEvent = function () {

		$log.debug('updateMonitoringEvent()');

		$localForage.getItem('monitoring_events').then(function (monitoringEvents) {
			if (monitoringEvents[monitoringEvents.length-1].state === 'CLRegionStateInside'){
				$scope.event = 'In range!';
				$scope.icon = 'ion-eye';
				$scope.sendPush('In range!', 'Region Entered');
			}
			else {
				$scope.event = 'Out of range :-(';
				$scope.icon = 'ion-eye-disabled';
				$scope.sendPush('Out of range :-(', 'Region Exited');
			}
		});
	};

	$scope.updateRangingEvent = function () {
		
		$log.debug('updateRangingEvent()');

		$localForage.getItem('ranging_events').then(function (rangingEvents) {
			$scope.event = rangingEvents[rangingEvents.length-1].beacons[0].proximity;
			if ($scope.event === 'ProximityImmediate'){
				$scope.icon = 'ion-volume-high';
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
		});
	};

	$log.debug('Subscribing for updates of monitoring events.');
	$scope.$on('updated_monitoring_events', $scope.updateMonitoringEvent);

	$log.debug('Subscribing for updates of ranging events.');
	$scope.$on('updated_ranging_events', $scope.updateRangingEvent);

}]);
angular.module('co.tython.beacon.demo.eventlog').controller('EventLogCtrl', ['$log', '$scope', '$localForage', function ($log, $scope, $localForage) {

	$log.debug('EventLogCtrl is loaded.');

	$scope.logs = [];

	$scope.updateMonitoringEvents = function () {

		$log.debug('updateMonitoringEvents()');

		$localForage.getItem('monitoring_event').then(function (monitoringEvent) {
			$scope.logs.unshift({
				event : monitoringEvent.region.identifier + ' Region ' + (monitoringEvent.state === 'CLRegionStateInside' ? 'Entered' : 'Exited')
			});
		});
	};

	$scope.updateRangingEvents = function () {
		
		$log.debug('updateRangingEvents()');

		$localForage.getItem('ranging_event').then(function (rangingEvent) {
			if (rangingEvent.beacons && rangingEvent.beacons[0]) {
				$scope.logs.unshift({
					event : 'Ranging Status: ' + rangingEvent.beacons[0].proximity
				});
			}			
		});
	};

	$log.debug('Subscribing for updates of monitoring events.');
	$scope.$on('updated_monitoring_event', $scope.updateMonitoringEvents);

	$log.debug('Subscribing for updates of ranging events.');
	$scope.$on('updated_ranging_event', $scope.updateRangingEvents);

}]);
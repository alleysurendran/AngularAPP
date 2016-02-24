angularApp.controller('DailyStatusController', function ($scope, $http) {
    $http.get('./shared/json/ActivityType.JSON')
    .then(function (response) {
        $scope.activitytype = response.data;
    });
});
angularApp.controller('DailyStatusController', ['$filter', '$state', '$scope', '$http', '$rootScope', 'LoginVaildationService', 'LogoutService', 'JSONService', 'UtilService', function ($filter, $state, $scope, $http, $rootScope, userSession, userLogout, jsonService, utilService) {

    //******************************To show side menu*****************************************//
    $rootScope.sidebar = true;

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    //To populate ActivityType Dropdown//
    jsonService.GetActivityType()
        .then(function (data) {
            alert(data);
            $scope.activity = data;
        });

    //To populate Hour Dropdown//
    $scope.hourList = utilService.GetHourList();

    //To populate ProjectNames Dropdown//    
    $scope.project = utilService.GetAllocatedProjectList();

    //To populate Minute Dropdown//
    $scope.minList = utilService.GetMinuteList();

    //To populate Date Dropdown//
    $scope.dateList = utilService.GetDateList();

    //To fill Daily Status List//
    jsonService.GetDailyStatusList()
        .then(function (data) {
            alert(data);
            $scope.dailystatuslist = data;
        });
    //alert(jsonService.GetDailyStatusList());
    //alert($scope.dailystatuslist);

    //Button click event//
    //var dailyStatusList = [];
    $scope.saveDailyStatus = function () {
        $scope.submitted = true;
        //if ($scope.dailystatusform.$valid) {
        //dailyStatusList = jsonService.GetJsonValue('./shared/json/DailyStatus.JSON');

        //dailyStatusList.push({
        //  });

        // }
    }

}]);
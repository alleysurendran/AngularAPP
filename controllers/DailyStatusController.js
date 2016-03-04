angularApp.controller('DailyStatusController', ['$q', '$filter', '$state', '$scope', '$http', '$rootScope', 'LoginVaildationService', 'LogoutService', 'JSONService', 'UtilService', function ($q, $filter, $state, $scope, $http, $rootScope, userSession, userLogout, jsonService, utilService) {

    //******************************To show side menu*****************************************//
    $rootScope.sidebar = true;

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    //To populate ActivityType Dropdown//
    jsonService.GetActivityType().then(
          function (data) {
              $scope.activity = data;
          })




    //To populate Hour Dropdown//
    $scope.hourList = utilService.GetHourList();
    $scope.selectedHour = $scope.hourList[8];

    //To populate Minute Dropdown//
    $scope.minList = utilService.GetMinuteList();
    $scope.selectedMinute = $scope.minList[0];

    //To populate Date Dropdown//
    $scope.dateList = utilService.GetDateList();
    $scope.selectedDate = $scope.dateList[7];

    //To populate ProjectNames Dropdown//    
    Getprojectlist();
    var myObjects = [];
    var projectList = [];

    function Getprojectlist() {

        var projAlloc = $q.defer();
        var projname = $q.defer();

        projname.promise.then(function () {
            $scope.project = projectList;
            $scope.selectedProject = $scope.project[0];
        })

        projAlloc.resolve(
            jsonService.GetProjectAllocationList()
            .then(function (response) {
                var newTemp = $filter("filter")(response, { EmployeeID: userSession.userID });
                angular.forEach(newTemp, function (value, key) {
                    myObjects.push(value.ProjectID);
                });

            })
            );

        projAlloc.promise.then(function () {
            projname.resolve(
                jsonService.GetProjectNames()
                .then(function (projectNames) {
                    angular.forEach(projectNames, function (filterObj, filterKey) {
                        angular.forEach(myObjects, function (value1, key1) {
                            if (value1 == filterObj.ProjectID) {
                                projectList.push(filterObj);
                            }
                        })
                    })
                })
            )
        })

    }



    //To fill Daily Status List//

    jsonService.GetDailyStatusList().then(
          function (data) {
              $scope.dailystatuslist = data;
          })

    //Button click event//
    $scope.saveDailyStatus = function () {
        $scope.submitted = true;
        if ($scope.dailystatusform.$valid) {
            jsonService.GetDailyStatusList().then(
         function (data) {

             data.push({
                 "DailyStatusID": 5,
                 "EmployeeID": userSession.userID,
                 "ActivityDate": $scope.selectedDate,
                 "ProjectName": $scope.selectedProject.ProjectName,
                 "ActivityType": $scope.activityType.ActivityType,
                 "Hour": $scope.selectedHour,
                 "Min": $scope.selectedMinute.label,
                 "Description": $scope.activitydescription
             });
             $scope.dailystatuslist = data;
             $scope.selectedDate = $scope.dateList[7];
             $scope.selectedProject = $scope.project[0];
             $scope.selectedHour = $scope.hourList[8];
             $scope.selectedMinute = $scope.minList[0];
             $scope.activitydescription = '';
             jsonService.GetActivityType().then(
          function (data) {
              $scope.activity = data;
          })
             
         })
        }
    };
}]);
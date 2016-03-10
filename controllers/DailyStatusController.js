angularApp.controller('DailyStatusController', ['$q', '$filter', '$scope', 'LoginVaildationService', 'JSONService', 'UtilService', function ($q, $filter, $scope, userSession, jsonService, utilService) {

    var isValid = $q.defer();
    isValid.resolve(
       utilService.AvoidUnAuthorisedAccess()
    );
    isValid.promise.then(
        ToPerform()
        );

    function ToPerform() {

        var userDetails = userSession.getStatus();
        if (userDetails.isAdmin) {
            $scope.showtab = true;
            $scope.isAdmin = true;
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

        function Getprojectlist() {
            var myObjects = [];
            var projectList = [];

            var isProjectAllocation = $q.defer();
            var isProjectName = $q.defer();

            isProjectName.promise.then(function () {
                $scope.project = projectList;
                $scope.selectedProject = $scope.project[0];
            })

            isProjectAllocation.resolve(
                jsonService.GetProjectAllocationList()
                .then(function (response) {
                    var newTemp = $filter("filter")(response, { EmployeeID: userDetails.userId });
                    angular.forEach(newTemp, function (value, key) {
                        myObjects.push(value.ProjectID);
                    });
                })
                );

            isProjectAllocation.promise.then(function () {
                isProjectName.resolve(
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
        jsonService.GetDailyStatusById(userDetails.userId).then(
              function (data) {
                  $scope.dailystatuslist = data;
              })


        //To fill Daily Status List of all employees//
        GetAllDailyStatusList();

        function GetAllDailyStatusList() {
            var employee = [];
            var alldailystatus = [];

            var isEmployeeList = $q.defer();
            var isStatusList = $q.defer();

            isEmployeeList.resolve(
                jsonService.GetEmployeeList().then(
                function (data) {
                    employee = data;
                })
                )

            isEmployeeList.promise
                .then(function () {
                    isStatusList.resolve(jsonService.GetDailyStatusList().then(
                      function (data) {
                          angular.forEach(data, function (value, key) {
                              angular.forEach(employee, function (empvalue, empkey) {
                                  if (value.EmployeeID == empvalue.EmployeeID) {
                                      alldailystatus.push(angular.extend({}, value, { "Name": empvalue.Name }));
                                  }
                              })
                          })

                      })
                )
                    isStatusList.promise.then($scope.alldailystatuslist = alldailystatus);
                });
        }


        //Saving Daily Status//
        $scope.saveDailyStatus = function () {
            $scope.submitted = true;
            if ($scope.dailystatusform.$valid) {
                $scope.dailystatuslist.push({
                    "DailyStatusID": 5,
                    "EmployeeID": userDetails.userId,
                    "ActivityDate": $filter('date')($scope.selectedDate, 'dd/MM/yyyy'),
                    "ProjectName": $scope.selectedProject.ProjectName,
                    "ActivityType": $scope.activityType.ActivityType,
                    "Hour": $scope.selectedHour,
                    "Min": $scope.selectedMinute.label,
                    "Description": $scope.activitydescription
                });
                $scope.alldailystatuslist.push({
                    "DailyStatusID": 5,
                    "EmployeeID": userSession.userID,
                    "ActivityDate": $filter('date')($scope.selectedDate, 'dd/MM/yyyy'),
                    "ProjectName": $scope.selectedProject.ProjectName,
                    "ActivityType": $scope.activityType.ActivityType,
                    "Hour": $scope.selectedHour,
                    "Min": $scope.selectedMinute.label,
                    "Description": $scope.activitydescription,
                    "Name": userDetails.userName
                });
                $scope.submitted = false;
                $scope.dailystatusform.activityType.$dirty = false;
                $scope.dailystatusform.description.$dirty = false;
                $scope.selectedDate = $scope.dateList[7];
                $scope.selectedProject = $scope.project[0];
                $scope.selectedHour = $scope.hourList[8];
                $scope.selectedMinute = $scope.minList[0];
                $scope.activitydescription = null;
                jsonService.GetActivityType().then(
                function (data) {
                    $scope.activity = data;
                })

            }
        };
    }
}]);
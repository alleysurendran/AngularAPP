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

            var projAlloc = $q.defer();
            var projname = $q.defer();

            projname.promise.then(function () {
                $scope.project = projectList;
                $scope.selectedProject = $scope.project[0];
            })

            projAlloc.resolve(
                jsonService.GetProjectAllocationList()
                .then(function (response) {
                    var userDetails = userSession.getStatus();
                    var newTemp = $filter("filter")(response, { EmployeeID: userDetails.userId });
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
        jsonService.GetDailyStatusById(userDetails.userId).then(
              function (data) {
                  $scope.dailystatuslist = data;
              })

        
        //To fill Daily Status List of all employees//
        GetAllDailyStatusList();

        function GetAllDailyStatusList() {
            var employeeArray = [];
            var alldailystatus = [];
            var dailystatus = [];

            var empList = $q.defer();
            var statusList = $q.defer();

            empList.resolve(
                jsonService.GetEmployeeList().then(
                function (data) {
                    employeeArray = data;
                })
                )

            empList.promise
                .then(function () {
                    statusList.resolve(jsonService.GetDailyStatusList().then(
                      function (data) {
                          dailystatus = data;
                          angular.forEach(data, function (value, key) {
                              angular.forEach(employeeArray, function (empvalue, empkey) {
                                  if (value.EmployeeID == empvalue.EmployeeID) {
                                      alldailystatus.push(angular.extend({}, value, { "Name": empvalue.Name }));
                              }
                              })
                          })

                      })
                )
                    statusList.promise.then($scope.alldailystatuslist = alldailystatus);
                });
        }


        //Button click event//
        $scope.saveDailyStatus = function () {
            $scope.submitted = true;
            if ($scope.dailystatusform.$valid) {
                data = $scope.dailystatuslist;
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
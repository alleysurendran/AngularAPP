angularApp.controller('DailyStatusController', ['$q', '$filter', '$scope', 'LoginVaildationService', 'JSONService', 'UtilService', function ($q, $filter, $scope, userSession, jsonService, utilService) {

    var isValid = $q.defer();
    isValid.resolve(
       utilService.AvoidUnAuthorisedAccess()
    );
    isValid.promise.then(
        ToPerform()
        );

    function ToPerform() {

        //Fetching activityTypes, projectNames, dailyStatus, employeeList, projectAllocationList//
        var activityTypes = jsonService.GetActivityType();
        var projectList = jsonService.GetProjectNames();
        var dailyStatusList = jsonService.GetDailyStatusList();
        var employeeList = jsonService.GetEmployeeList();
        var projectAllocationList = jsonService.GetProjectAllocationList();

        var userDetails = userSession.getStatus();
        if (userDetails.isAdmin) {
            $scope.showtab = true;
            $scope.isAdmin = true;
        }


        //To populate ActivityType Dropdown//
        activityTypes.then(
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


        //To populate ProjectNames Dropdown based on current user//    
        GetSpecificProjectList();

        function GetSpecificProjectList() {
            var projectArray = [];
            $q.all([projectAllocationList, projectList])
            .then(function (resultArray) {
                var allocatedProjects = $filter("filter")(resultArray[0], { EmployeeID: userDetails.userId });
                angular.forEach(allocatedProjects, function (value, key) {
                    var projectValue = $filter("filter")(resultArray[1], { ProjectID: value.ProjectID });
                    projectArray.push(projectValue[0]);
                });
                $scope.project = projectArray;
                $scope.selectedProject = $scope.project[0];
            });
        }


        //To fill Daily Status List of current user// 
        GetDailyStatusList();
        function GetDailyStatusList() {

            $q.all([activityTypes, projectList, dailyStatusList])
                .then(function (resultArray) {
                    var dailyStatusById = $filter("filter")(resultArray[2], { EmployeeID: userDetails.userId });
                    angular.forEach(dailyStatusById, function (value, key) {
                        var activity = $filter("filter")(resultArray[0], { ActivityTypeID: value.ActivityTypeID });
                        var project = $filter("filter")(resultArray[1], { ProjectID: value.ProjectID });

                        dailyStatusById.splice(dailyStatusById.indexOf(value), 1, angular.extend({}, value, { "ActivityType": activity[0].ActivityType, "ProjectName": project[0].ProjectName }));
                    })
                    $scope.dailystatuslist = dailyStatusById;
                });
        }


        //To fill Daily Status List of all employees (for admin view)//
        GetAllDailyStatusList();

        function GetAllDailyStatusList() {
            $q.all([activityTypes, projectList, dailyStatusList, employeeList])
                .then(function (resultArray) {
                    var alldailystatus = resultArray[2];
                    angular.forEach(alldailystatus, function (value, key) {
                        var activity = $filter("filter")(resultArray[0], { ActivityTypeID: value.ActivityTypeID });
                        var project = $filter("filter")(resultArray[1], { ProjectID: value.ProjectID });
                        var employee = $filter("filter")(resultArray[3], { EmployeeID: value.EmployeeID });

                        alldailystatus.splice(alldailystatus.indexOf(value), 1, angular.extend({}, value, { "ActivityType": activity[0].ActivityType, "ProjectName": project[0].ProjectName, "Name": employee[0].Name }));
                    })
                    $scope.alldailystatuslist = alldailystatus;
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

                //To save in all employee list
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
                $scope.activityType = null;
            }
        };
    }
}]);
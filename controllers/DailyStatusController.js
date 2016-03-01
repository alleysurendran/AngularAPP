angularApp.controller('DailyStatusController', ['$filter', '$state', '$scope', '$http', '$rootScope', 'LoginVaildationService', 'LogoutService', function ($filter, $state, $scope, $http, $rootScope, userSession, userLogout) {

    //******************************To show side menu*****************************************//
    $rootScope.sidebar = true;

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    //************************To populate ActivityType Dropdown******************************//
    $http.get('./shared/json/ActivityType.JSON')
    .then(function (response) {
        $scope.activity = response.data;
    });

    //********************************To populate Hour Dropdown*****************************//
    $scope.hourList = hourList();
    function hourList() {
        var myObjects = [];
        for (var i = 0; i <= 24; i++) {
            myObjects.push(i);
        }
        return myObjects;
    };

    //*************************To populate ProjectNames Dropdown*****************************//
    //$http.get('./shared/json/ProjectNames.JSON')
    //.then(function (response) {
    //    $scope.project = response.data;
    //});
    var myObjects = [];
    var projectList = [];
    if (userSession.isLogged) {
        $http.get('./shared/json/ProjectAllocation.JSON')
        .then(function (response) {
            var newTemp = $filter("filter")(response.data, { EmployeeID: userSession.userID });
            angular.forEach(newTemp, function (value, key) {
                myObjects.push(value.ProjectID);
            });
        });
        $http.get('./shared/json/ProjectNames.JSON')
               .then(function (projectNames) {
                   angular.forEach(projectNames.data, function (filterObj, filterKey) {
                       angular.forEach(myObjects, function (value1, key1) {
                           if (value1 == filterObj.ProjectID) {
                               projectList.push(filterObj);
                           }
                       })
                   })
               });
        $scope.project = projectList;
    }
    //*****************************To populate Minute Dropdown*******************************//
    $scope.minList = [
    { value: 0, label: "00" },
    { value: 15, label: "15" },
    { value: 30, label: "30" },
    { value: 45, label: "45" }
    ];

    //******************************To populate Date Dropdown*******************************//
    $scope.dateList = getDateList();

    function getDateList() {
        var myObjects = [];
        var today = new Date(), tempdate = null, temp_date, temp_month, temp_year, calculated_date;
        for (var i = 7; i >= 0; i--) {
            tempdate = new Date(today);
            tempdate.setDate(today.getDate() - i);
            temp_date = tempdate.getDate();
            temp_month = tempdate.getMonth() + 1;
            temp_year = tempdate.getFullYear();
            calculated_date = Date.parse(temp_month + "/" + temp_date + "/" + temp_year);
            myObjects.push(calculated_date);
        }
        return myObjects;
    };

    //******************************To fill Daily Status List******************************//
    $http.get('./shared/json/DailyStatus.JSON')
    .then(function (response) {
        $scope.dailystatuslist = response.data;
    });

    //**********************************Button click event*********************************//
    $scope.saveDailyStatus = function () {
        $scope.submitted = true;
        if ($scope.dailystatusform.$valid) {

            //code
        }
    }

}]);
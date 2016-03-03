angularApp.service('UtilService', ['$http', 'LoginVaildationService', '$filter', 'JSONService', function ($http, userSession, $filter, jsonService) {

    this.GetDateList = function () {
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

    this.GetMinuteList = function () {
        return ([
            { value: 0, label: "00" },
            { value: 15, label: "15" },
            { value: 30, label: "30" },
            { value: 45, label: "45" }
        ])
    };

    this.GetHourList = function () {
        var myObjects = [];
        for (var i = 0; i <= 24; i++) {
            myObjects.push(i);
        }
        return myObjects;
    };

    this.GetAllocatedProjectList = function () {
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
                           });
                       });

                   });
        }
        return projectList;
    };
}]);
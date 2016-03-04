
angularApp.service('JSONService', function ($http) {


    this.GetDailyStatusList = function () {
        return $http.get('./shared/json/DailyStatus.JSON')
       .then(
           function (response) {
               return response.data;
           },
           function (errResponse) {
               console.error('Error fetching daily status.');
           }
       );
    }

    this.GetActivityType = function () {
        return $http.get('./shared/json/ActivityType.JSON')
        .then(
            function (response) {
                return response.data;
            },
            function (errResponse) {
                console.error('Error fetching activity type.');
            }
        );
    }

    this.GetCustomerList = function () {
        return $http.get('./shared/json/Customer.JSON')
        .then(
            function (response) {
                return response.data;
            },
            function (errResponse) {
                console.error('Error fetching customer details.');
            }
        );
    }

    this.GetProjectAllocationList = function () {
        return $http.get('./shared/json/ProjectAllocation.JSON')
        .then(
            function (response) {
                return response.data;
            },
            function (errResponse) {
                console.error('Error fetching project allocation details.');
            }
        );
    }

    this.GetProjectNames = function () {
        return $http.get('./shared/json/ProjectNames.JSON')
        .then(
            function (response) {
                return response.data;
            },
            function (errResponse) {
                console.error('Error fetching project details.');
            }
        );
    }
});



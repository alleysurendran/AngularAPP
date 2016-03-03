
angularApp.service('JSONService', function ($http) {


    this.GetDailyStatusList = function () {
        return $http.get('./shared/json/DailyStatus.JSON')
       .then(
           function (response) {
               return response.data;
           },
           function (errResponse) {
               console.error('Error fetching booked meeting rooms');
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
                console.error('Error fetching booked meeting rooms');
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
                console.error('Error fetching booked meeting rooms');
            }
        );
    }

});



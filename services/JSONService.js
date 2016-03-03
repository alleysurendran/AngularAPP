

angularApp.service('JSONService', function ($http) {

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



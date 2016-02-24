angularApp.controller('CustomerController', function ($scope,$http) {
        $http.get("shared/json/Customer.JSON")
        .then(function (response) {
            $scope.customerDetails = response.data;
           // alert($scope.customerDetails);
        });
       
});


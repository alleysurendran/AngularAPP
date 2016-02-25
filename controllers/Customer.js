angularApp.controller('CustomerController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
    BindCustomer();
    function BindCustomer() {
                $http.get("shared/json/Customer.JSON")
                .then(function (response) {
                    $scope.customerDetails = response.data;
                });

        }
   
}]);


angularApp.controller('CustomerController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
    BindCustomer();
    function BindCustomer() {
        alert('bind');
                $http.get("shared/json/Customer.JSON")
                .then(function (response) {
                    alert('hi');
                    $scope.customerDetails = response.data;
                });

        }
   
}]);


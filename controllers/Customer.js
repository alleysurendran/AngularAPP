
angularApp.controller('CustomerController', ['$scope','$filter', '$http','$rootScope', 'LoginVaildationService', function ($scope,$filter, $http,$rootScope, userSession) {
    if (userSession.isLogged) {
        $rootScope.sidebar = true;
        $rootScope.showUser = true;
        $rootScope.userName = userSession.username;
    }

    $rootScope.sidebar = true;
        BindCustomer();
        function BindCustomer() {
            $http.get("shared/json/Customer.JSON")
            .then(function (response) {
                $scope.customerDetails = response.data;
            });

        }

}]);


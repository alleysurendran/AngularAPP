angularApp.controller('CustomerController', ['$scope', '$http','$rootScope', 'LoginVaildationService', function ($scope, $http,$rootScope, userSession) {
    if (userSession.isLogged) {
        $rootScope.sidebar = true;
        $rootScope.showUser = true;
        $rootScope.userName = userSession.username;
    }

        $http.get("shared/json/Customer.JSON")
        .then(function (response) {
            $scope.customerDetails = response.data;
           // alert($scope.customerDetails);
        });
       
}]);


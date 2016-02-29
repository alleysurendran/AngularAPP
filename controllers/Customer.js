
angularApp.controller('CustomerController', ['$scope', '$filter', '$http', '$rootScope', 'LoginVaildationService', function ($scope, $filter, $http, $rootScope, userSession) {

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    //******************************To show side menu*****************************************//
    $rootScope.sidebar = true;

    //********************************To populate customer details****************************//
    BindCustomer();
    function BindCustomer() {
        $http.get("./shared/json/Customer.JSON")
        .then(function (response) {
            $scope.customerDetails = response.data;
        });

    }

}]);


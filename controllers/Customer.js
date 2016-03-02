
angularApp.controller('CustomerController', ['$scope', '$filter', '$http', '$rootScope', 'LoginVaildationService', 'JSONService', function ($scope, $filter, $http, $rootScope, userSession, jsonService) {

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    //******************************To show side menu*****************************************//
    $rootScope.sidebar = true;
    var promise = jsonService.GetJsonValue('./shared/json/Customer.JSON');
    promise.then(function (data) {
       $scope.customerDetails =data;
    });

}]);


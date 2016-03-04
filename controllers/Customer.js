
angularApp.controller('CustomerController', ['$scope', '$filter', '$http', '$state','$rootScope', 'LoginVaildationService', 'JSONService', function ($scope, $filter, $http,$state, $rootScope, user, jsonService) {
    var userSession = user.getStatus();
    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    //******************************To show side menu*****************************************//
    $rootScope.sidebar = true;

    jsonService.GetCustomerList().then(
          function(data){
              $scope.customerDetails = data;
          })


}]);


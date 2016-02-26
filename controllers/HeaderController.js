angularApp.controller('HeaderController', ['$scope','$state', 'LoginVaildationService', 'LogoutService', function ($scope,$state, userSession, userLogout) {
    if (userSession.isLogged)
    {
        $scope.userName = userSession.username;
        $scope.showUser = true;
    }
    $scope.logout =  function () {
        userLogout.clearData();
            $scope.showUser = false;
            $state.go('login');
    };
}]);
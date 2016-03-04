angularApp.controller('HeaderController', ['$scope','$state', 'LoginVaildationService', 'LogoutService', function ($scope,$state, userSession, userLogout) {

    var user = userSession.getStatus();
    if (!user.isLogged) {
        $state.go('login');
    }
    $scope.logout = function () {
        userLogout.clearData();
            $state.go('login');
    };
}]);
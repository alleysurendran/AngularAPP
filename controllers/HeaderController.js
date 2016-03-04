angularApp.controller('HeaderController', ['$scope','$state', 'LoginVaildationService', 'LogoutService', function ($scope,$state, userSession, userLogout) {
    alert('header');
    var user = userSession.getStatus();
    if (!user.isLogged) {
        $state.go('login');
    }
    $scope.logout = function () {
        userLogout.clearData();
        //$scope.showUser = { 'visibility': 'hidden' };
            $state.go('login');
    };
}]);
angularApp.controller('HeaderController', ['$scope','$state', 'LoginVaildationService', 'LogoutService', function ($scope,$state, userSession, userLogout) {
    //if (userSession.isLogged)
    //{
    //    $scope.userName = userSession.username;
    //    $scope.showUser = { 'visibility': 'visible' };
    //}
    //if (!userSession.isLogged) {
    //    //$scope.userName = userSession.username;
    //    $scope.showUser = { 'visibility': 'hidden' };
    //}
    $scope.logout =  function () {
        userLogout.clearData();
        //$scope.showUser = { 'visibility': 'hidden' };
            $state.go('login');
    };
}]);
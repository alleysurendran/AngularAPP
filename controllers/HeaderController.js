angularApp.controller('HeaderController', ['$scope','$state', 'LoginVaildationService', 'LogoutService', function ($scope,$state, userSession, userLogout) {
    
    $scope.logout =  function () {
        userLogout.clearData();
            $state.go('login');
    };
}]);
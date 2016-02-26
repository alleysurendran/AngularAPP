angularApp.controller('DashboardController', ['$scope','$rootScope', 'LoginVaildationService', 'LogoutService', function ($scope,$rootScope, userSession, userLogout) {
   
       if (userSession.isLogged) {
        $rootScope.showUser = true;
        $rootScope.userName = userSession.username;
        $rootScope.sidebar = true;
    }
}]);
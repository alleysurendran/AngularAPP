angularApp.controller('DashboardController', ['$scope', '$rootScope', 'LoginVaildationService', 'LogoutService', function ($scope, $rootScope, userSession, userLogout) {

   //*******************To set Sign Out Link and User Name in Header*****************************************//
    if (userSession.isLogged) {
        
        $rootScope.userName = userSession.username;
        $rootScope.showUser = true;
        $rootScope.sidebar = true;
    }
}]);
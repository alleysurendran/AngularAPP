angularApp.controller('DashboardController', ['$state', '$scope', '$rootScope', 'LoginVaildationService', 'LogoutService', function ($state,$scope, $rootScope, userSession, userLogout) {

   //*******************To set Sign Out Link and User Name in Header*****************************************//
    if (userSession.isLogged) {
        
        $rootScope.userName = userSession.username;
        $rootScope.showUser = { 'visibility': 'visible' };
        $rootScope.sidebar = true;
    }
    else
    {
        $state.go('login');
    }
}]);
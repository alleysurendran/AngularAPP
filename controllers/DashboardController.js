angularApp.controller('DashboardController', ['$state', '$scope', '$rootScope', 'LoginVaildationService', 'LogoutService', function ($state,$scope, $rootScope, user, userLogout) {
    var userSession = user.getStatus();
    //*******************To set Sign Out Link and User Name in Header*****************************************//
    if (userSession.isLogged) {
        $rootScope.userName = userSession.userName;
        $rootScope.showUser = { 'visibility': 'visible' };
        $rootScope.sidebar = true;
    }
    else
    {
        $state.go('login');
    }
}]);
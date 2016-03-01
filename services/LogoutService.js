angularApp.factory('LogoutService', ['$rootScope', '$state', 'LoginVaildationService', function ($rootScope, $state, userSession) {

    var logout = {};

    logout.clearData = function () {
        userSession.isLogged = false;
        userSession.username = '';
        userSession.isadmin = false;
        //$state.go('login');
        return userSession;
    }
    return logout;
    
}]);
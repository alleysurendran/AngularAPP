angularApp.factory('LogoutService', ['$rootScope', '$state', 'LoginVaildationService', function ($rootScope, $state, userSession) {

    var logout = {};

    logout.clearData = function () {
        if (localStorage.getItem("loggedInUser") != null) {
            localStorage.removeItem('loggedInUser');
            return null
        }
        return null;
    }
    return logout;
    
}]);
angularApp.factory('LogoutService', ['$rootScope', '$state','$q', 'LoginVaildationService', 'UtilService', function ($rootScope, $state,$q, userSession, utilService) {

    var logout = {};
    var isCleared = $q.defer();
    logout.clearData = function () {
        
        if (localStorage.getItem("loggedInUser") != null) {
            isCleared.resolve(
                 localStorage.removeItem('loggedInUser')
            );
            isCleared.promise.then(
                utilService.AvoidUnAuthorisedAccess()
            )
            return null
        }
        return null;
    }
    return logout;
    

    
}]);
angularApp.factory('LogoutService', ['$q', 'UtilService', '$cookies', function ($q, utilService, $cookies) {

    var logout = {};
    var isCleared = $q.defer();
    logout.clearData = function () {
        if ($cookies.getObject("userSession") != null) {
            $cookies.remove("userSession");
            utilService.AvoidUnAuthorisedAccess();
        }
    }
    return logout;
}]);

﻿angularApp.controller('HeaderController', ['$scope', '$state', '$q', 'LoginVaildationService', 'LogoutService', 'UtilService', function ($scope, $state, $q, userSession, userLogout, utilService) {

    /*var user = userSession.getStatus();
    if (!user.isLogged) {
        $state.go('login');
    }*/
    $scope.logout = function () {
        isValid.promise.then(
           $state.go('login')
     );
    };
    var isValid = $q.defer();
    isValid.resolve(
       userLogout.clearData()
    );
}]);
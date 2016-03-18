angularApp.controller('HeaderController', ['$scope', '$state', '$q', 'LogoutService', 'UtilService', function ($scope, $state, $q, userLogout, utilService) {

    $scope.logout = function () {
        var isValid = $q.defer();
        isValid.resolve(
            userLogout.clearData()
        );
        isValid.promise.then(
           $state.go('login')
     );
    };

}]);
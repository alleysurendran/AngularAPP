angularApp.controller('DashboardController', ['$state', '$scope', '$rootScope', 'LoginVaildationService', 'LogoutService', 'UtilService', function ($state, $scope, $rootScope, user, userLogout,util) {
     util.AvoidUnAuthorisedAccess();
}]);
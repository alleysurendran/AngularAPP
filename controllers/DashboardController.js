angularApp.controller('DashboardController', ['UtilService', function (util) {
    util.AvoidUnAuthorisedAccess();
}]);
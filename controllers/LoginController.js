angularApp.controller('LoginController', ['$rootScope', '$scope', '$http', '$state', 'LoginVaildationService', function ($rootScope, $scope, $http, $state, User) {

    $scope.validateUser = function () {
        $http.get('./shared/json/Employee.JSON')
    .then(function (response) {
        var data = response.data;
        var len = data.length;
        var isValidUser = false;
        for (var i = 0; i < len; i++) {
            if ((data[i].Email == $scope.username && data[i].Password == $scope.password)) {
                User.isLogged = true;
                User.username = data[i].Name;
                User.isadmin = data[i].IsAdmin;
                isValidUser = true;
                $rootScope.userName = User.username;
                $rootScope.sidebar = true;
                $rootScope.showUser = true;
                $state.go('dashboard');
                break;
            }
        }
        if (!isValidUser) {
            User.isLogged = false;
            User.username = '';
            $scope.showerror = true;
        }

    });
    };
    $rootScope.sidebar = false;
    $scope.showerror = false;
}]);


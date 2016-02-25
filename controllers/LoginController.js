angularApp.controller('LoginController', ['$rootScope', '$scope', '$http', '$state', 'LoginVaildationService', function ($rootScope, $scope, $http, $state, User) {


    $scope.validateUser = function () {
        $http.get('./shared/json/Employee.JSON')
    .then(function (response) {
        var data = response.data;
        var len = data.length;
        var isValidUser = false;
        for (var i = 0; i < len; i++) {
            if ((data[i].Email == $scope.username && data[i].Password == $scope.password)) {
                $state.go('dashboard');
                $rootScope.sidebar = true;
                User.isLogged = true;
                User.username = data[i].Name;
                User.isadmin = data[i].IsAdmin;
                isValidUser = true;
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




//$http.get('./shared/json/Employee.JSON').then(function (data) {
//    $scope.data = data;

//    var userExists = false;


//    




//    angular.forEach($scope.data, function (value, key) {
//        alert(value.Email);
//        if (!userExists) {
//            if (value.Email == $scope.username && value.Password == $scope.password) {
//                alert(value.Email);
//                $state.go('dashboard');
//                $rootScope.sidebar = true;
//                userExists = true;
//            }
//        }
//        else
//        {
//            $state.go('login');
//        }
//    });



//});

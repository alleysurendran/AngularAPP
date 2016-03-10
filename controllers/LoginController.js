angularApp.controller('LoginController', ['$rootScope', '$scope', '$state', '$q', 'LoginVaildationService', 'JSONService', function ($rootScope, $scope, $state, $q, user, json) {

    var userDetails = user.getStatus();

    var isValidUser = false;
    var userSession = {
        isLogged: false,
        userName: '',
        userId: 0,
        isAdmin: false
    };

    $rootScope.sidebar = false;
    $scope.showerror = false;

    hideBackground();

    if (!userDetails.isLogged) {
        hideBackground();
    }
    else {
        showSideBar();
    }
    
    var empList = $q.defer();
    $scope.validateUser = function () {
        empList.resolve(
        json.EmployeeList().then(
         function (response) {
             var data = response;
             isValidUser = IsValidUser(data);
         })
         );

        empList.promise.then(function () {
            if (!isValidUser) {
                userSession.isLogged = false;
                userSession.userName = '';
                userSession.userId = 0;
                user.setStatus(userSession);
                $scope.showerror = true;
            }
        });

    };

    function IsValidUser(data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            if ((data[i].Email == $scope.username && data[i].Password == $scope.password)) {
                userSession.isLogged = true;
                $rootScope.userName = userSession.userName = data[i].Name;
                userSession.isAdmin = data[i].IsAdmin;
                userSession.userId = data[i].EmployeeID;
                localStorage.setItem("loggedInUser", JSON.stringify(userSession));
                user.setStatus(userSession);
                showSideBar();
                break;
            }
        }
        return isValidUser;
    }

   

    function showSideBar() {
        isValidUser = true;
        $rootScope.sidebar = true;
        $rootScope.isLoggedIn = true;
        $rootScope.showUser = { 'visibility': 'visible' };
        $rootScope.bodybackground = { 'background': ' ' };
        $state.go('dashboard');
    }

    function hideBackground() {
        $rootScope.showUser = { 'visibility': 'hidden' };
        $rootScope.bodybackground = { 'background': 'none' };
    }

}]);
angularApp.controller('LoginController', ['$filter', '$rootScope', '$scope', '$state', '$q', 'LoginVaildationService', 'JSONService', function ($filter, $rootScope, $scope, $state, $q, user, json) {

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
        json.GetEmployeeList().then(
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
            else{
                showSideBar();
            }
        });

    };

    function IsValidUser(data) {
        var currentUser = $filter("filter")(data, { Email: $scope.username, Password: $scope.password });
        if (currentUser.length != 0) {
            userSession.isLogged = true;
            $rootScope.userName = userSession.userName = currentUser[0].Name;
            userSession.isAdmin = currentUser[0].IsAdmin;
            userSession.userId = currentUser[0].EmployeeID;
            user.setStatus(userSession);
            showSideBar();
            return true;
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

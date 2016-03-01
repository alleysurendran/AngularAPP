angularApp.factory('LoginVaildationService', [function () {
    var usersession = {
        isLogged: false,
        username: '',
        userID:0,
        isadmin:false
    };
    return usersession;
}]);
angularApp.factory('LoginVaildationService', [function () {
    var usersession = {
        isLogged: false,
        username: '',
        isadmin:false
    };
    return usersession;
}]);
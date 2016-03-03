angularApp.factory('LoginVaildationService', [function () {
    alert('hello');
    var usersession = {
        isLogged: false,
        username: '',
        userID:0,
        isadmin:false
    };
    return usersession;
}]);
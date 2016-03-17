angularApp.service('LoginVaildationService', function ($cookies) {
    var userSession;

    return {
        setStatus: function (value) {
            userSession =
                {
                    isLogged: value.isLogged,
                    userName: value.userName,
                    userId: value.userId,
                    isAdmin: value.isAdmin
                };
            $cookies.putObject("userSession", userSession);
        },
        getStatus: function () {
            if ($cookies.getObject("userSession") != null) {
                var loddedInUser = $cookies.getObject("userSession");
                return loddedInUser;
            }
            else {
                return userSession = {
                    isLogged: false,
                    userName: '',
                    userId: 0,
                    isAdmin: false
                };
            }
        }
    };


});
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
            var expireDate = new Date();
            expireDate.setSeconds(1200);
            $cookies.putObject("userSession", userSession, { 'expires': expireDate });
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
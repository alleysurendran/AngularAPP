angularApp.service('LoginVaildationService', function () {
    var userSession;
   
    return {
        getStatus: function () {

            if (localStorage.getItem("loggedInUser") != null) {
                var loddedInUser = localStorage.getItem("loggedInUser");
                return JSON.parse(loddedInUser);
            }
            else {
                return  userSession = {
                        isLogged: false,
                        userName: '',
                        userId: 0,
                        isAdmin: false
                    };
            }

        },
        setStatus: function (value) {
            userSession =
                {
                    isLogged: value.isLogged,
                    userName: value.userName,
                    userId: value.userId,
                    isAdmin: value.isAdmin
                };

        }
    };


});
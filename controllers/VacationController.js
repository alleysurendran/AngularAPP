

angularApp.controller('VacationController',['$scope', '$http', '$rootScope', '$state','LoginVaildationService', function ($scope, $http, $rootScope, $state,userSession) {

    $rootScope.sidebar = true;

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    $http.get('./shared/json/VacationTypes.JSON')
     .then(function (response) {
         $scope.vacationTypes = response.data;


     });

    $http.get('./shared/json/Employee.JSON')
     .then(function (response) {
         $scope.employees = response.data;


     });

    $http.get('./shared/json/Vacation.JSON')
    .then(function (response) {
        $scope.vacations = response.data;


    });

    $scope.GetVacationType = function (vacationTypeID) {

        $http.get('./shared/json/VacationTypes.JSON')
            .success(function (data) {
                var objArr = angular.fromJson(data).filter(function (item) {
                    if (item.VacationTypeID === vacationTypeID) {
                        return true;
                    }
                });
                console.log(objArr[0].VacationType);

            });

    }


}]);




angularApp.controller('CustomerController', ['$scope', '$filter', '$http', '$state','$rootScope','$q', 'LoginVaildationService', 'JSONService','UtilService' ,function ($scope, $filter, $http,$state, $rootScope,$q, user, jsonService,utilService) {
    //Redirect to login when user is not authorised
    var isValid = $q.defer();
    isValid.resolve(
       utilService.AvoidUnAuthorisedAccess()
    );
    isValid.promise.then(
         jsonService.GetCustomerList().then(
         function (data) {
             $scope.customerDetails = data;
         })
        );

}]);



angularApp.controller('VacationController',['$scope', '$http', '$rootScope', '$state','LoginVaildationService','JSONService' , function ($scope, $http, $rootScope, $state,userSession,jsonService) {

    //To show sidemenu
    $rootScope.sidebar = true;

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    //GetAllVacations();

    $scope.employee = {};
    $scope.employee.vacationMode = 1;

    //To populate VacationTypes Dropdown
    //$scope.employee.vacationTypes = jsonService.GetJsonValue('./shared/json/VacationTypes.JSON');

    $http.get('./shared/json/VacationTypes.JSON')
           .then(function (response) {

               $scope.employee.vacationTypes = response.data;
           });

   

    //To populate Employee Dropdown
  // $scope.employees = jsonService.GetJsonValue('./shared/json/Employee.JSON');

    $http.get('./shared/json/Employee.JSON')
           .then(function (response) {

               $scope.employees = response.data;
           });
   

    //Gets all Vacation details
  //  $scope.vacations = jsonService.GetJsonValue('./shared/json/Vacation.JSON');


    $scope.vacations = {};

    var promise = jsonService.GetJsonValue();
    promise.then(function (data) {
        $scope.vacations = data;
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

    $scope.SaveVacation = function ()
    {
       debugger
        $scope.submitted = true;
        if ($scope.frmVacationRequest.$valid) {

            $http.get('./shared/json/Vacation.JSON')
         .then(function (response) {
             
             response.data.push({
                 "VacationID": 1,
                 "EmployeeID": 1,
                 "Noofdays": $scope.noOfDays,
                 "VacationFrom": $scope.vacationFrom,
                 "VacationTo": $scope.vacationTo,
                 "VacationType": $scope.employee.vacationMode,
                 "SendRequestTo": $scope.requestTo.Name,
                 "SendCopyToID": 2,
                 "Comments": $scope.comments,
                 "Status": "Pending",
                 "Remarks": ""
             });
            
             $scope.vacations = response.data;

             


         });
           
            
            
            
        }
    }


}]);



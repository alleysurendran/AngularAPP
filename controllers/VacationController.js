
angularApp.controller('VacationController', ['$q', '$filter', '$state', '$scope', '$http', '$rootScope', 'LoginVaildationService', 'LogoutService', 'JSONService', 'UtilService', function ($q, $filter, $state, $scope, $http, $rootScope, userSession, userLogout, jsonService, utilService) {

    //To show sidemenu
   // $rootScope.sidebar = true;

    //******************Redirect to login page if the user is not logged in*******************//
   // if (!userSession.isLogged) {
  //      $state.go('login');
    // }

   

    var isValid = $q.defer();
    isValid.resolve(
       utilService.AvoidUnAuthorisedAccess()
    );
    isValid.promise.then(
        ToPerform()
        );


    function ToPerform() {

        //To set the default value in vacation type dropdown.
        $scope.vacationMode = 1;


        //To populate VacationTypes Dropdown
        jsonService.GetVacationTypes().then(
             function (data) {
                 $scope.vacationTypes = data;
             })



        //To populate Employee Dropdown
        jsonService.GetEmployeeList().then(
             function (data) {
                 $scope.employees = data;
             })



        //To populate year dropdown
        $scope.yearList = utilService.GetYearList();


        //To make current year as selected value in the year list dropdown
        $scope.yearSelection = new Date().getFullYear();


        FilterVacationsByYear(new Date().getFullYear());

        //Code to list vacations filtered by year
        function FilterVacationsByYear(year) {
            var filteredVacations = [];
            jsonService.GetAllVacations().then(
             function (data) {
                 
                 var allVacations = $filter("filter")(data, { EmployeeID: userSession.userID });
                 
                 angular.forEach(allVacations, function (value, key) {

                     if (value.VacationFrom.indexOf(year) != -1) {
                         filteredVacations.push(value);
                     }
                 });

                 $scope.vacations = filteredVacations;
                 if (year == new Date().getFullYear()) {
                     GetRemainingVacationsCount(filteredVacations);
                     GetLossOfPayCount(filteredVacations);
                 }

             });


        }
        // To get year wise filtered vacations on drop down change event
        $scope.GetFilteredVacations = function (year) {

            FilterVacationsByYear(year)
        };



        function GetRemainingVacationsCount(filteredVacations) {
            var vacationCount = 0;
            angular.forEach(filteredVacations, function (value, key) {

                if (value.VacationType == "Paid")
                { vacationCount = vacationCount + value.Noofdays }
            });

            $scope.remainingVacationCount = 20 - vacationCount;

        }

        function GetLossOfPayCount(filteredVacations) {
            var lopCount = 0;
            angular.forEach(filteredVacations, function (value, key) {

                if (value.VacationType == "Loss of Pay")
                { lopCount = lopCount + value.Noofdays }
            });

            $scope.noOfLossOfPayTaken = lopCount;

        }


        //Code to save vacations.
        $scope.SaveVacation = function () {

            $scope.submitted = true;
            if ($scope.frmVacationRequest.$valid) {

                jsonService.GetAllVacations().then(
                function (data) {
                    debugger
                    data.push({
                        "VacationID": 1,
                        "EmployeeID": 2,
                        "Noofdays": $scope.noOfDays,
                        "VacationFrom": $scope.vacationFrom,
                        "VacationTo": $scope.vacationTo,
                        "VacationType": $scope.vacationMode.VacationType,
                        "SendRequestTo": $scope.requestTo,
                        "SendCopyToID": 2,
                        "Comments": $scope.comments,
                        "Status": "Pending",
                        "Remarks": ""
                    });

                    $scope.vacations = data;


                });


            }
        }
    }

}]);



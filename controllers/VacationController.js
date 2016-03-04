
angularApp.controller('VacationController',['$scope', '$filter', '$http', '$rootScope', '$state','LoginVaildationService','JSONService' , function ($scope, $filter, $http, $rootScope, $state,userSession,jsonService) {

    //To show sidemenu
    $rootScope.sidebar = true;

    //******************Redirect to login page if the user is not logged in*******************//
    if (!userSession.isLogged) {
        $state.go('login');
    }

    $scope.employee = {};
    $scope.employee.vacationMode = 1;

    

   

    //To populate VacationTypes Dropdown
    $http.get('./shared/json/VacationTypes.JSON')
    .then(function (response) {
        $scope.employee.vacationTypes = response.data;
    });


    //To populate Employee Dropdown
    $http.get('./shared/json/Employee.JSON')
    .then(function (response) {
        $scope.employees = response.data;
    });

   
        //Gets all Vacation details
        $http.get('./shared/json/Vacation.JSON')
       .then(function (response) {
           $scope.vacations = $filter("filter")(response.data, { EmployeeID: userSession.userID });

       });
   
    
    //To populate year dropdown and to make current year as selected value

        $scope.year = {};
        $scope.year.selected = new Date().getFullYear();
       
        $scope.year.yearList = GetYearList();

        function GetYearList() {

        var yearsList = [];
        for (var i = new Date().getFullYear() ; i >= 2008; i--)
        {
            yearsList.push(i)
        }
        return yearsList;

    }

   
    
        FilterVacationsByYear(new Date().getFullYear());

       //Code to filter vacations by year
        function FilterVacationsByYear(year){
           
         $http.get('./shared/json/Vacation.JSON')
                   .success(function (data) {
                       
                       var allVacations = $filter("filter")(data, { EmployeeID: userSession.userID });
                       var filteredVacations = [];
                       angular.forEach(allVacations, function (value, key) {

                           
                             if (value.VacationFrom.indexOf(year) != -1)
                            {
                                
                                filteredVacations.push(value);
                            }
                       });

                       $scope.vacations = filteredVacations;
                   });


        }

        $scope.GetFilteredVacations = function (year) {

            FilterVacationsByYear(year)
        };


    //Code to save vacations.
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



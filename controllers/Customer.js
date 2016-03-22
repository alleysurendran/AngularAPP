
angularApp.controller('CustomerController', ['$scope', '$filter', '$q', 'JSONService', 'UtilService', function ($scope, $filter, $q, jsonService, utilService) {
    var isValid = $q.defer();
    isValid.resolve(
       utilService.AvoidUnAuthorisedAccess()
    );
    isValid.promise.then(
        ToPerform()
        );
    function ToPerform() {
        var customerList = jsonService.GetCustomerList();
        var countryList = jsonService.GetCountryList();
        var accountManagerList = jsonService.GetEmployeeList();

        GetCustomerList();
        function GetCustomerList() {
            $q.all([customerList, countryList, accountManagerList])
            .then(function (resultArray) {
                var customers = resultArray[0];
                angular.forEach(customers, function (value, key) {
                    var country = $filter("filter")(resultArray[1], { CountryID: value.CountryID });
                    var accountManager = $filter("filter")(resultArray[2], { EmployeeID: value.AccountManagerID });

                    customers.splice(customers.indexOf(value), 1, angular.extend({}, value, { "CountryName": country[0].CountryName, "AccountManager": accountManager[0].Name }));
                });
                $scope.customerDetails = customers;
            });
        }
    }
}]);

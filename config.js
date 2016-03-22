angularApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/Dashboard.html',
            controller: 'DashboardController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        .state('vacation', {
            url: '/vacation',
            templateUrl: 'views/vacation.html',
            controller: 'VacationController'
        })
        .state('dailystatus', {
            url: '/dailystatus',
            templateUrl: 'views/dailystatus.html',
            controller: 'DailyStatusController'
        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'views/Customer.html',
            controller: 'CustomerController'
        });


});

angularApp.run(['$state', function ($state) {
    $state.go('login');

}]);



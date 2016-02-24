angularApp.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        
        .state('vacation', {
            url: '/vacation',
            templateUrl: 'views/vacation.html',
      		controller : 'VacationController'
        })
        .state('dailystatus', {
            url: '/dailystatus',
            templateUrl: 'views/vacation.html',
            controller: 'DailyStatusController'
        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'views/Customer.html',
        controller: 'CustomerController'
         });
        
        
});




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
            templateUrl: 'views/dailystatus.html',
            controller: 'DailyStatusController'
        });
        
});

//myApp.config([ '$routeProvider', function($routeProvider) {
//	$routeProvider

//	.when('/vacation', {
//		templateUrl : '/views/vacation.html',
//		controller : 'VacationController'
//	})
	
//	.otherwise({
//		redirectTo : '/'
//	});
//} ]);


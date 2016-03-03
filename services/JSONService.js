
angularApp.service('JSONService', function ($http) {

    this.GetDailyStatusList = function () {
        return $http.get('./shared/json/DailyStatus.JSON')
    .then(function (response) {
        result = response.data;
    })
    }
    this.GetActivityType = function () {
        return $http.get('./shared/json/ActivityType.JSON')
           .then(function (response) {
               response.data;
           })
    }


});


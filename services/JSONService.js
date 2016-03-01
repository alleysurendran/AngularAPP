
angularApp.service('JSONService', function ($http) {

    var jsonResult = {};
    jsonResult.GetJsonValue = function (filepath) {

        $http.get(filepath)
       .then(function (response) {
           jsonResult = response.data;
       });
        return jsonResult;

    }

    return jsonResult;
});
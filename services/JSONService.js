

angularApp.service('JSONService', function ($http,$q) {

    var jsonResult = $q.defer();
    function ReturnResult(filePath)
    {
        var jsonArray = [];
        $http.get(filePath).then(function (data) {
            jsonResult.resolve(FormatJsonResult(data));
            
        });
    }
    this.GetJsonValue = function (filepath) {
        ReturnResult(filepath);
        return jsonResult.promise;
    };

    function FormatJsonResult(data) {
        var jsonArray = [];
        angular.forEach(data, function (element, key) {
            if (key == "data") {
                angular.forEach(element, function (value) {
                    jsonArray.push(value);
                });
            }

        });
        return jsonArray;
    }
  
});


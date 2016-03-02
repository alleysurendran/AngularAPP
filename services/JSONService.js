

angularApp.service('JSONService', function ($http, $q) {

    var jsonResult = $q.defer();
    function ReturnResult(filePath) {
        var jsonArray = [];
        $http.get(filePath).then(function (data) {
            jsonResult.resolve(data);
        });
    }
    this.GetJsonValue = function (filepath) {
        ReturnResult(filepath);
        return jsonResult.promise;
    };
   
  
});



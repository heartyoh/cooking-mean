'use strict';

//Cookings service used for cookings REST endpoint
angular.module('mean.cooking').factory('Cooking', ['$resource', function($resource) {
    return $resource('cookings/:cookingId', {
        cookingId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.cooking').factory('FileReader', ["$q", "$log", function ($q, $log) {
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function(reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress",
                {
                    total: event.total,
                    loaded: event.loaded
                });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
         
        var reader = getReader(deferred, scope);         
        reader.readAsDataURL(file);
         
        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL  
    };
}]);

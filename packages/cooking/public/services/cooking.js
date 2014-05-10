'use strict';

//Cookings service used for cookings REST endpoint
angular.module('mean').factory('Cooking', ['$resource', function($resource) {
    return $resource('cookings/:cookingId', {
        cookingId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

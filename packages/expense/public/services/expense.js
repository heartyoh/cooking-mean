'use strict';

//Expenses service used for expenses REST endpoint
angular.module('mean').factory('Expense', ['$resource', function($resource) {
    return $resource('expenses/:expenseId', {
        expenseId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

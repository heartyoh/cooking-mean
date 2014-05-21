'use strict';

angular.module('mean.expense').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('expense list', {
                url: '/expenses',
                templateUrl: 'expense/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create expense', {
                url: '/expenses/create',
                templateUrl: 'expense/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit expense', {
                url: '/expenses/:expenseId/edit',
                templateUrl: 'expense/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('expense by id', {
                url: '/expenses/:expenseId',
                templateUrl: 'expense/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
	}
]);

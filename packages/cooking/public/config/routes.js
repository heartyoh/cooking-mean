'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('cooking list', {
            url: '/cookings',
            templateUrl: 'cooking/views/list.html'
        }).state('create cooking', {
            url: '/cookings/:cookingId',
            templateUrl: 'cooking/views/create.html'
        });
    }
]);

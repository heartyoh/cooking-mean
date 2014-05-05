'use strict';

angular.module('mean').controller('CookingController', ['$scope', 'Global',
    function($scope, Global, Cooking) {
        $scope.global = Global;
        $scope.cooking = {
            name: 'cooking'
        };
    }
]);

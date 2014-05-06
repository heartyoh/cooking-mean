'use strict';

angular.module('mean.cooking').controller('CookingController', ['$scope', '$stateParams', '$location', 'Global', 'Cooking', 
	function ($scope, $stateParams, $location, Global, Cooking) {
    $scope.global = Global;

    $scope.create = function() {
        var cooking = new Cooking({
            title: this.title,
            content: this.content
        });
        cooking.$save(function(response) {
            $location.path('cookings/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(cooking) {
        if (cooking) {
            cooking.$remove();

            for (var i in $scope.cookings) {
                if ($scope.cookings[i] === cooking) {
                    $scope.cookings.splice(i, 1);
                }
            }
        }
        else {
            $scope.cooking.$remove();
            $location.path('cookings');
        }
    };

    $scope.update = function() {
        var cooking = $scope.cooking;
        if (!cooking.updated) {
            cooking.updated = [];
        }
        cooking.updated.push(new Date().getTime());

        cooking.$update(function() {
            $location.path('cookings/' + cooking._id);
        });
    };

    $scope.find = function() {
        Cooking.query(function(cookings) {
            $scope.cookings = cookings;
        });
    };

    $scope.findOne = function() {
        Cooking.get({
            cookingId: $stateParams.cookingId
        }, function(cooking) {
            $scope.cooking = cooking;
        });
    };
}]);
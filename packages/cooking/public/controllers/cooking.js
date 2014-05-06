'use strict';

angular.module('mean.cooking').controller('CookingController', ['$scope', '$stateParams', '$location', 'Global', 'Cooking', 'FileReader',
	function ($scope, $stateParams, $location, Global, Cooking, FileReader) {
    $scope.global = Global;

    $scope.create = function() {
        var cooking = new Cooking({
            title: this.title,
            description: this.description
        });
        cooking.$save(function(response) {
            $location.path('cookings/' + response._id);
        });

        this.title = '';
        this.description = '';
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

    $scope.getFile = function () {
        $scope.progress = 0;
        FileReader.readAsDataUrl($scope.file, $scope)
        .then(function(result) {
            $scope.imageSrc = result;
        });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });


}])
.directive("ngFileSelect",function(){
    return {
        link: function($scope,el){
            el.bind("change", function(e){
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })
        }
    }  
});

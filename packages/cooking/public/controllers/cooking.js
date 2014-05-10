'use strict';

angular.module('mean').controller('CookingController', ['$scope', '$stateParams', '$location', 'Global', 'Cooking',
	function ($scope, $stateParams, $location, Global, Cooking) {
    $scope.global = Global;

    $scope.create = function() {
        var cooking = new Cooking({
            title: this.title,
            description: this.description,
            image: this.image
        });
        cooking.$save(function(response) {
            $location.path('cookings/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.image = '';
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
}])
.directive('appFilereader', function($q) {
    /*
    made by elmerbulthuis@gmail.com WTFPL licensed
    */
    var slice = Array.prototype.slice;

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        ngModel.$render = function() {};

        element.bind('change', function(e) {
          var element = e.target;
          if(!element.value) return;

          element.disabled = true;
          $q.all(slice.call(element.files, 0).map(readFile))
            .then(function(values) {
              if (element.multiple) ngModel.$setViewValue(values);
              else ngModel.$setViewValue(values.length ? values[0] : null);
              element.value = null;
              element.disabled = false;
            });

          function readFile(file) {
            var deferred = $q.defer();

            var reader = new FileReader();
            reader.onload = function(e) {
              deferred.resolve(e.target.result);
            };
            reader.onerror = function(e) {
              deferred.reject(e);
            };
            reader.readAsDataURL(file);

            return deferred.promise;
          }

        }); //change

      } //link

    }; //return
}); //appFilereader

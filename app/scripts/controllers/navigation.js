'use strict';

app.controller('NavCtrl', function ($scope, $location, ItemService, $localStorage) {
    $scope.item = {title: '', done: false};
    $scope.isEditModeEnabled = false;

        $scope.storage = $localStorage.$default({
            donehidden: false
        });

        $scope.storage = $localStorage.$default({
            sortEnabled: false
        });


    $scope.addItem = function () {
        ItemService.create($scope.item).then(function (ref) {
            $location.path('/items/' + ref.name());
            $scope.item = {title: '', done: false};
      });
    };

    $scope.removeDone = function () {
        ItemService.removeDone();
    };


    $scope.$watch(function() {return $scope.isEditModeEnabled}, function(newValue) {
        ItemService.isEditModeEnabled = newValue
    });

  }
);

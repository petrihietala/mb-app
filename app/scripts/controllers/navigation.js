'use strict';

app.controller('NavCtrl', function ($scope, $location, ItemService, $localStorage) {
    $scope.item = ItemService.selectedItem;//{title: '', done: false};

        $scope.storage = $localStorage.$default({
            donehidden: false
        });

        $scope.hideDone = $scope.storage.donehidden;

    $scope.addItem = function () {
        ItemService.create($scope.item).then(function (ref) {
            $location.path('/items/' + ref.name());
            $scope.item = {title: '', done: false};
      });
    };

    $scope.removeDone = function () {
        ItemService.removeDone();
    };



    //$scope.$watch(function() {return ItemService.selectedItem}, function(newValue) { $scope.item = newValue});

  }
);

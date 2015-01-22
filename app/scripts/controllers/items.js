/**
 * Created by ph2 on 18.1.15.
 */

'use strict';

app.controller('ItemsCtrl', function ($scope, ItemService, $localStorage) {
    $scope.items = ItemService.all;
    $scope.undoItemId = null;
    $scope.isEditModeEnabled = false;
    $scope.orderVariable = '';
    $scope.huuhaa = true;

    $scope.storage = $localStorage.$default({
        donehidden: false,
        sortEnabled: false
    });


    $scope.hideDone = $scope.storage.donehidden;
    //$scope.sortEnabled = $scope.storage.sortEnabled;


    $scope.getItems = function (hideDone) {

        var items = $scope.items;

        if (hideDone) {
            items = items.filter(function (ref) {
                return !ref.done
            });
        }

        return items;
    };

    $scope.deleteItem = function (item) {
        ItemService.delete(item);
    };

    $scope.update = function (item) {
        if(item.done) {
            $scope.undoItemId = null;
            ItemService.update(item);
        }
        else {
            item.done = true;
            $scope.undoItemId = item.$id;
        }
    }

    $scope.cancelAdd = function(item) {
        item.done = true;
        $scope.undoItemId = null;
    }

    $scope.addConfirmed = function(item) {
        item.done = false;
        $scope.undoItemId = null;
        ItemService.update(item);
    }

    $scope.selectItem = function (item) {
        ItemService.selectedItem = item;
    }



    $scope.$watch(function() { return $scope.storage.sortEnabled}, function(newValue) {
        if (newValue) {
            $scope.orderVariable = 'done';
        }
        else {
            $scope.orderVariable = '';
        }
    });


    $scope.$watch(function() {return ItemService.isEditModeEnabled}, function(newValue) {
        $scope.isEditModeEnabled = newValue
        if ($scope.isEditModeEnabled == false)
        {
           $scope.items.forEach(function(item) {
               ItemService.update(item);
           })
        }
    });

});

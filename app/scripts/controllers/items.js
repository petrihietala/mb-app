/**
 * Created by ph2 on 18.1.15.
 */

'use strict';

app.controller('ItemsCtrl', function ($scope, ItemService, $localStorage) {
    $scope.items = ItemService.all;
    $scope.undoItemId = null;
    $scope.editItem = null;
    $scope.openedItemId = null;
    $scope.isEditModeEnabled = false;
    $scope.orderVariable = '';

    $scope.storage = $localStorage.$default({
        donehidden: false,
        sortEnabled: false
    });

    $scope.hideDone = $scope.storage.donehidden;

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

    $scope.confirmAdd = function (item) {
        if(item.done) {
            $scope.undoItemId = item.$id;
        }
    }

    $scope.update = function (item) {
        if(item.done) {
            //$scope.undoItemId = null;
            ItemService.update(item);
        }
        else
        {
            item.done = true;
        }
    }

    $scope.cancelAdd = function(item) {
        item.done = true;
        $scope.undoItemId = null;
    }

    $scope.addConfirmed = function(item) {
        item.done = false;
        item.date = new Date();
        $scope.undoItemId = null;
        ItemService.update(item);
    }


    $scope.selectItem = function(item) {
        if ($scope.editItem != null && $scope.editItem.$id != item.$id) {
            ItemService.update($scope.editItem);
        }

        $scope.editItem = null;
        if ($scope.openedItemId == item.$id)
        {
            $scope.openedItemId = null;
        }
        else {
            $scope.openedItemId = item.$id;
        }
    }

    $scope.$watch(function() { return $scope.storage.sortEnabled}, function(newValue) {
        if (newValue) {
            $scope.orderVariable = ['done', ''];
        }
        else {
            $scope.orderVariable = '';
        }
    });

    $scope.selectEditItem = function(isEditable, item) {
        if (isEditable) {
            $scope.editItem = item;
        }
        else {
            ItemService.update(item);
            $scope.editItem = null;
        }
    }



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

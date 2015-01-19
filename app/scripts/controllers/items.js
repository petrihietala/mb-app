/**
 * Created by ph2 on 18.1.15.
 */

'use strict';

app.controller('ItemsCtrl', function ($scope, ItemService, $localStorage) {
    $scope.item = ItemService.selectedItem;//{title: '', done: false};
    $scope.items = ItemService.all;

    //$scope.hideDone = hideDone;

    $scope.storage = $localStorage.$default({
        donehidden: false
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

    $scope.update = function (item) {
        if(item.done) {
            ItemService.update(item);
        }
        else {
            item.undoConfirmEnabled = true;
        }
    }

    $scope.cancelAdd = function(item) {
        item.done = true;
        item.undoConfirmEnabled = false;
    }

    $scope.addConfirmed = function(item) {
        item.undoConfirmEnabled = false;
        ItemService.update(item);
    }

    $scope.selectItem = function (item) {
        ItemService.selectedItem = item;
    }



});

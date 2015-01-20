'use strict';

/**
 *
 * Main module of the application.
 */

/* global app:true */
/* exported app */

var app = angular
  .module('mb-app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ngStorage'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/items.html',
        controller: 'ItemsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .constant('FIREBASE_URL', 'https://marketbasket.firebaseio.com');

/**
 * Created by ph2 on 18.1.15.
 */

'use strict';

app.controller('ItemsCtrl', ["$scope", "ItemService", "$localStorage", function ($scope, ItemService, $localStorage) {
    $scope.item = ItemService.selectedItem;//{title: '', done: false};
    $scope.items = ItemService.all;
    $scope.undoItemId = null;
    $scope.isEditModeEnabled = false;

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
            $scope.undoItemId = null;
            ItemService.update(item);
        }
        else {
            $scope.undoItemId = item.$id;
        }
    }

    $scope.cancelAdd = function(item) {
        item.done = true;
        $scope.undoItemId = null;
    }

    $scope.addConfirmed = function(item) {
        $scope.undoItemId = null;
        ItemService.update(item);
    }

    $scope.selectItem = function (item) {
        ItemService.selectedItem = item;
    }

    $scope.$watch(function() {return ItemService.isEditModeEnabled}, function(newValue) { $scope.isEditModeEnabled = newValue});

    $scope.$watch(function() {return $scope.isEditModeEnabled}, function(newValue) {
        if (newValue == false)
        {
           $scope.items.forEach(function(item) {
               ItemService.update(item);
           })
        }
    });

}]);

/**
 * Created by ph2 on 18.1.15.
 */


'use strict';


app.factory('ItemService', ["$firebase", "FIREBASE_URL", function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var items = $firebase(ref.child('items')).$asArray();

    var selectedItem = null;
    var isEditModeEnabled = true;

    var ItemService = {
        all: items,
        create: function (item) {

            var i = items;
            if (item.title != "") {
                i = items.$add(item);
            }

            return i;
        },
        get: function (itemId) {
            return $firebase(ref.child('items').child(itemId)).$asObject();
        },
        delete: function (item) {
            return items.$remove(item);
        },
        update: function (item) {
            return items.$save(item);
        },
        removeDone: function () {

            var doneItems = items.filter(function (item) {
                return item.done
            });

            $.each(doneItems, function() {
                ItemService.delete(this);
            });
        },
        setSelectedItem: function(item) {
            selectedItem = item;
        },
        selectedItem: selectedItem,
        isEditModeEnabled: isEditModeEnabled,
        setEditMode: function(ref) {
            isEditModeEnabled = ref;
        }

    };

    return ItemService;
}]);

'use strict';

app.controller('NavCtrl', ["$scope", "$location", "ItemService", "$localStorage", function ($scope, $location, ItemService, $localStorage) {
    $scope.item = ItemService.selectedItem;//{title: '', done: false};
    $scope.isEditModeEnabled = false;

        $scope.storage = $localStorage.$default({
            donehidden: false
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



    $scope.$watch(function() {return $scope.isEditModeEnabled}, function(newValue) { ItemService.isEditModeEnabled = newValue});

  }]
);

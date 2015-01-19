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

    $scope.setDone = function (item) {
        ItemService.setDone(item);
    }

    $scope.hideDoneChanged = function (ref) {
        $scope.storage.donehidden = ref;
    }

    $scope.selectItem = function (item) {
        ItemService.selectedItem = item;
    }


}]);

/**
 * Created by ph2 on 18.1.15.
 */


'use strict';


app.factory('ItemService', ["$firebase", "FIREBASE_URL", function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var items = $firebase(ref.child('items')).$asArray();

    var selectedItem = null;

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
        setDone: function (item) {
            item.done = true;
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
        selectedItem: selectedItem

    };

    return ItemService;
}]);

'use strict';

app.controller('NavCtrl', ["$scope", "$location", "ItemService", "$localStorage", function ($scope, $location, ItemService, $localStorage) {
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

  }]
);
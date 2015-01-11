'use strict';

/**
 * @ngdoc overview
 * @name angNewsApp
 * @description
 * # angNewsApp
 *
 * Main module of the application.
 */

/* global app:true */
/* exported app */

var app = angular
  .module('angNewsApp', [
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
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
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
 * Created by ph2 on 5.12.14.
 */

'use strict';

//var hideDone = true;

app.controller('PostsCtrl', ["$scope", "PostService", "$localStorage", function ($scope, PostService, $localStorage) {
  $scope.post = {title: '', done: false};
  $scope.posts = PostService.all;

  //$scope.hideDone = hideDone;

  $scope.storage = $localStorage.$default({
    donehidden: false
  });

  $scope.hideDone = $scope.storage.donehidden;

  /*$scope.submitPost = function () {
    PostService.create($scope.post).then(function () {
      $scope.post = {url: 'http://', title: ''};
    });
  };*/

  $scope.getPosts = function (hideDone) {

    var items = $scope.posts;

    if (hideDone) {
      items = items.filter(function (ref) {
        return !ref.done
      });
    }

    return items;
  };

  $scope.deletePost = function (post) {
    PostService.delete(post);
  };

  $scope.setDone = function (post) {
    PostService.setDone(post);
  }

  $scope.hideDoneChanged = function (ref) {
    $scope.storage.donehidden = ref;
  }

}]);

/**
 * Created by ph2 on 8.12.14.
 */

'use strict';


app.factory('PostService', ["$firebase", "FIREBASE_URL", function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var posts = $firebase(ref.child('posts')).$asArray();

  var PostService = {
    all: posts,
    create: function (post) {

       var p = posts;
      if (post.title != "") {
        p = posts.$add(post);
      }

      return p;
    },
    get: function (postId) {
      return $firebase(ref.child('posts').child(postId)).$asObject();
    },
    delete: function (post) {
      return posts.$remove(post);
    },
    setDone: function (post) {
      post.done = true;
      return posts.$save(post);
    },
    removeDone: function () {

      var doneItems = posts.filter(function (ref) {
        return ref.done
      });

      $.each(doneItems, function() {
          PostService.delete(this);
      });
    }
  };

  return PostService;
}]);

'use strict';

app.controller('NavCtrl', ["$scope", "$location", "PostService", "$localStorage", function ($scope, $location, PostService, $localStorage) {
    $scope.post = {title: '', done: false};

        $scope.storage = $localStorage.$default({
            donehidden: false
        });

        $scope.hideDone = $scope.storage.donehidden;

    $scope.submitPost = function () {
      PostService.create($scope.post).then(function (ref) {
        $location.path('/posts/' + ref.name());
        $scope.post = {title: '', done: false};
      });
    };

    $scope.removeDonez = function () {
        PostService.removeDone();
    };


  }]
);

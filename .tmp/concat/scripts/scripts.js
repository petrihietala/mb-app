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
    'firebase'
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

app.controller('PostsCtrl', ["$scope", "PostService", function ($scope, PostService) {
  $scope.post = {title: '', done: false};
  $scope.posts = PostService.all;

  /*$scope.submitPost = function () {
    PostService.create($scope.post).then(function () {
      $scope.post = {url: 'http://', title: ''};
    });
  };*/

  $scope.deletePost = function (post) {
    PostService.delete(post);
  };

  $scope.setDone = function (post) {
    PostService.setDone(post);
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
      return posts.$add(post);
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

app.controller('NavCtrl', ["$scope", "$location", "PostService", function ($scope, $location, PostService) {
    $scope.post = {title: '', done: false};

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

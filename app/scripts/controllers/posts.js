/**
 * Created by ph2 on 5.12.14.
 */

'use strict';

app.controller('PostsCtrl', function ($scope, PostService) {
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

});

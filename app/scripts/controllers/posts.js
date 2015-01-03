/**
 * Created by ph2 on 5.12.14.
 */

'use strict';

var hideDone = false;

app.controller('PostsCtrl', function ($scope, PostService) {
  $scope.post = {title: '', done: false};
  $scope.posts = PostService.all;

  $scope.hideDone = hideDone;

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

  /*$scope.toggleHideDone = function () {
    hideDone = !hideDone;
  }*/

});

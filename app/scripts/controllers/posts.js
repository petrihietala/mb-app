/**
 * Created by ph2 on 5.12.14.
 */

'use strict';

//var hideDone = true;

app.controller('PostsCtrl', function ($scope, PostService, $localStorage) {
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

});

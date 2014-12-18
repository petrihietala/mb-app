'use strict';

app.controller('NavCtrl', function ($scope, $location, PostService) {
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

  }
);

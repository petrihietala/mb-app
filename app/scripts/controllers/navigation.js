'use strict';

app.controller('NavCtrl', function ($scope, $location, PostService) {
    $scope.post = {url: '', title: ''};

    $scope.submitPost = function () {
      PostService.create($scope.post).then(function (ref) {
        $location.path('/posts/' + ref.name());
        $scope.post = {url: 'http://', title: ''};
      });
    };

  }
);

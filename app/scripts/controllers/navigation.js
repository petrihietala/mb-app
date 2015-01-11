'use strict';

app.controller('NavCtrl', function ($scope, $location, PostService, $localStorage) {
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


  }
);

'use strict';

app.controller('MainController', ['$scope', '$timeout', function($scope,
  $timeout) {
  $scope.count = '&nbsp;&nbsp;';

  $scope.onOff = false;
  $scope.switch = function() {
    if (!$scope.onOff) {
      $scope.onOff = true;
      $scope.count = '--';
    } else if ($scope.onOff) {
      $scope.onOff = false;
      $scope.started = false;
      $scope.stricted = false;
      $scope.count = '&nbsp;&nbsp;';
    }
  };

  $scope.flash = false;
  $scope.started = false;
  $scope.start = function() {
    if ($scope.onOff) {
      $scope.started = true;
      $scope.flash = true;
      $timeout(function(){
        $scope.flash = false;
      }, 1000);
    }
  };

  $scope.stricted = false;
  $scope.strict = function() {
    if ($scope.onOff && !$scope.stricted) {
      $scope.stricted = true;
    } else if ($scope.onOff && $scope.stricted) {
      $scope.stricted = false;
    }
  };
}]);

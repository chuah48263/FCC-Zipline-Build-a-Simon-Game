'use strict';

app.controller('MainController', ['$scope', '$timeout', function($scope,
  $timeout) {
  $scope.count = '&nbsp;&nbsp;';
  var arr = [];
  var user = [];

  $scope.onOff = false;
  $scope.switch = function() {
    if (!$scope.onOff) {
      $scope.onOff = true;
      $scope.count = '--';
    } else if ($scope.onOff) {
      $scope.onOff = false;
      $scope.stricted = false;
      $scope.count = '&nbsp;&nbsp;';
      $scope.flash = false;
      reset();
    }
  };

  var reset = function() {
    arr = [];
    user = [];
    [0, 1, 2, 3].forEach(function(e) {
      $('#' + e).removeClass('active');
    });
    timer.forEach(function(elem, idx) {
      $timeout.cancel(timer[idx]);
    });
    $scope.started = false;
  };

  $scope.flash = false;
  $scope.started = false;
  $scope.start = function() {
    if ($scope.onOff) {
      $scope.count = '--';
      reset();
      $scope.flash = true;
      timer[42] = $timeout(function() {
        $scope.flash = false;
        $scope.press('init');
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

  $scope.press = function(num) {
    if (num === 'init') {
      arr = [];
      user = [];
      random();
      blink();
    } else {
      if ($scope.started) {
        user.push(num);
        if (arr[user.length - 1] !== user[user.length - 1]) {
          $('#error').trigger('play');
          $scope.count = '!!';
          $scope.flash = true;
          timer[43] = $timeout(function() {
            $scope.flash = false;
          }, 1000);
          if ($scope.stricted) {
            timer[44] = $timeout(function() {
              $scope.start();
            }, 1200);
          } else {
            timer[45] = $timeout(function() {
              user = [];
              blink();
            }, 1200);
          }
        } else if (arr[user.length - 1] === user[user.length - 1]) {
          $('#audio' + num).trigger('play');
          if (user.length < 20) {
            if (arr.length !== user.length) {} else if (arr.length ===
              user.length) {
              user = [];
              random();
              blink();
            }
          } else if (user.length === 20) {
            $scope.started = false;
            timer[46] = $timeout(function() {
              $scope.count = '**';
              $('#success').trigger('play');
              $scope.flash = true;
              timer[47] = $timeout(function() {
                $scope.flash = false;
              }, 1000);
            }, 1200);
          }
        }
      }
    }
  };

  var times = function() {
    if (arr.length > 0 && arr.length < 5) {
      return 1200;
    } else if (arr.length >= 5 && arr.length < 9) {
      return 1000;
    } else if (arr.length >= 9 && arr.length < 13) {
      return 800;
    } else if (arr.length >= 13 && arr.length <= 20) {
      return 600;
    }
  };

  var timer = [];
  var blink = function() {
    $scope.started = false;
    arr.forEach(function(element, index) {
      timer[index] = $timeout(function() {
        $('#audio' + element).trigger('play');
        $('#' + element).addClass('active');
        timer[index + 20] = $timeout(function() {
          $('#' + element).removeClass('active');
        }, times() / 2);
      }, index * times() + times());
    });
    timer[40] = $timeout(function() {
      $scope.started = true;
    }, arr.length * times() + times() / 2);
    timer[41] = $timeout(function() {
      $scope.count = (arr.length < 10) ? '0' + arr.length : arr.length;
    }, times() / 2);
  };

  var random = function() {
    var int = Math.floor(Math.random() * 4);
    arr.push(int);
  };
}]);

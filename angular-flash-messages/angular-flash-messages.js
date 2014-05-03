var flashModule = angular.module('vn.flash', []);

flashModule.directive('flash', function() {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'angular-flash-messages/template.html',
    controller: function($scope, $rootScope, $timeout) {
      var time = 3000;
      var reset;

      $scope.messages = [];

      var cleanMessages = function() {
        if ( $scope.messages.length ) {
          $scope.messages.splice(0, 1);

          $timeout.cancel(reset);

          reset = $timeout(cleanMessages, time);
        }
      };

      $rootScope.$on('vn.flash.add', function(event, message) {
        $scope.messages.push(message);

        $timeout.cancel(reset);

        reset = $timeout(cleanMessages, time);
      });

      $rootScope.$on('vn.flash.removeAll', function() {
        var removeAll = function() {
          $timeout.cancel(reset);

          if ( $scope.messages.length ) {
            $scope.messages.splice(0, 1);

            $timeout(removeAll, 200);
          }
        };

        removeAll();
      });
    }
  };
});

flashModule.service('Flash', ['$rootScope', function($rootScope) {
  'use strict';

  this.add = function(message) {
    $rootScope.$emit('vn.flash.add', message);
  };

  this.removeAll = function() {
    $rootScope.$emit('vn.flash.removeAll');
  };
}]);

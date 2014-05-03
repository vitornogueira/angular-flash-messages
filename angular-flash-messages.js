var flashModule = angular.module('vn.flash', []);

flashModule.directive('flash', function() {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'template.html',
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

      $rootScope.$on('messages', function(event, message) {
        $scope.messages.push(message);

        $timeout.cancel(reset);

        reset = $timeout(cleanMessages, time);
      });
    }
  };
});

flashModule.factory('Flash', ['$rootScope', function($rootScope) {
  'use strict';

  return {
    add: function(message) {
      $rootScope.$emit('messages', message);
    }
  };
}]);

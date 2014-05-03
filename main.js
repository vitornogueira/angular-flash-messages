var App = angular.module('myApp', ['vn.flash', 'ngAnimate']);

App.controller('AppController', [
  'Flash',
  '$scope',
  function (Flash, $scope) {
    'use strict';

    $scope.showMessage = function(type) {
      Flash.add({
        class: 'alert-' + type,
        title: 'Example',
        text: 'This is a message'
      });
    };
  }
]);

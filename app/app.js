'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('app', [
  'ngRoute',
  'dndLists'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


app.controller('DefaultController', function($scope) {
  $scope.buttonContainerPressed = false;
});

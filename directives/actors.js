/**
 * Created by IanGallacher on 10/21/2016.
 */

app.directive('actors', function()
{
  return {
    restrict: 'E',
    templateUrl: '/resources/actor.html',
    scope: false,
    controller: 'actorsController'
  }
});

app.controller('actorsController', function($scope)
{
});

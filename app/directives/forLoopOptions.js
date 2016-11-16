/**
 * Created by IanGallacher on 11/16/2016.
 */
app.directive('forLoopOptions', function()
{
  return {
    restrict: 'E',
    templateUrl: '/LearnToCode/app/resources/forLoopOptions.html',
    scope: true, // make our own mouseOver functions.
    controller: 'forLoopOptionsController'
  }
});

app.controller('forLoopOptionsController', function($scope)
{
  $scope.mouseIn = function($event)
  {
    $event.stopPropagation();
  };
});

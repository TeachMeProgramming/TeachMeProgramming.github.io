/**
 * Created by IanGallacher on 11/16/2016.
 */
app.directive('screen', function()
{
  return {
    restrict: 'E',
    templateUrl: '/LearnToCode/app/resources/screen.html',
    scope: false,
    controller: 'screenController'
  }
});

app.controller('screenController', function($scope)
{
 // $scope.currentLevel = 2;
});

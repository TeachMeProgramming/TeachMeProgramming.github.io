/**
 * Created by IanGallacher on 10/27/2016.
 */
app.directive('gameMenu', function()
{
  return {
    restrict: 'E',
    templateUrl: '/LearnToCode/app/resources/gameMenu.html',
    scope: false,
    controller: 'gameMenu'
  }
});

app.controller('gameMenu', function($scope)
{
  $scope.onDrop = function(list, item)
  {
    item.mouseOver = false; // if a user drops a command, but the command location does not end up under the mouse cursor, the command is no longer highlighted.
    return item;
  };


  $scope.runCodeClicked = function () {
    if($scope.currentlyExecuting || $scope.codeBank.length <= 0) return;


    $scope.codeBank.contents.forEach(function(command) {
      command.isValid = true;
    });


    $scope.startCodeExecution();
  };

  $scope.resetCodeClicked = function () {
    $scope.resetLevel();
  };
});

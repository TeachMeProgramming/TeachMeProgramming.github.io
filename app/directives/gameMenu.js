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

app.controller('gameMenu', function($scope, $timeout, commandFactory)
{
  $scope.currentlyExecuting = false;

  var commandIndex = 0;


  $scope.runCodeClicked = function () {
    if($scope.currentlyExecuting) return;
    $scope.currentlyExecuting=true; // executeCode() checks for this every frame. Be sure to set it before executeCode()!
    commandIndex = 0;
    executeCode();
  };

  var executeCode = function()
  {
    $timeout(function ()
    {
      if($scope.currentlyExecuting==true)
      {
        var currentCommand = $scope.codeBank[commandIndex];
        var functionName = currentCommand.execute;
        commandFactory[functionName](currentCommand, $scope.player);
        commandIndex += 1;


        executeCode();
      }
    }, 1000)
  }
});

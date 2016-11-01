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
    if($scope.currentlyExecuting || $scope.codeBank.length <= 0) return;
    $scope.currentlyExecuting=true; // executeCode() checks for this every frame. Be sure to set it before executeCode()!
    commandIndex = 0;


    $scope.codeBank.forEach(function(command) {
      command.isValid = true;
    });


    executeCode();
  };

  $scope.resetCodeClicked = function () {
    $scope.resetActors();
  };


  var timeoutDuration = 1000;
  var currentCommand;
  var executeCode = function()
  {
    if(currentCommand != null) currentCommand.currentlyExecuting = false; // No longer highlight previous command.
    if($scope.currentlyExecuting == true && commandIndex < $scope.codeBank.length)
    {
      currentCommand= $scope.codeBank[commandIndex];
      currentCommand.currentlyExecuting = true; // Highlight command that is currently running.
      var functionName = currentCommand.execute;
      commandFactory[functionName](currentCommand, $scope.player, $scope.gameData.GetCurrentMap());
      commandIndex += 1;

      $timeout(function ()
      {
        executeCode();
      }, timeoutDuration);
      // Don't check for victory until the player gets to the end of his path.
      $timeout($scope.checkVictory, timeoutDuration * 2); // add 2000 to account for animation time. .actor transition = 2s
    }
  }
});

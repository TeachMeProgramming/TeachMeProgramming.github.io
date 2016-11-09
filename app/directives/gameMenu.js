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


  $scope.runCodeClicked = function () {
    if($scope.currentlyExecuting || $scope.codeBank.length <= 0) return;
    $scope.currentlyExecuting=true; // executeCode() checks for this every frame. Be sure to set it before executeCode()!


    $scope.codeBank.forEach(function(command) {
      command.isValid = true;
    });


    $scope.executeCodeBlock($scope.codeBank);
  };

  $scope.resetCodeClicked = function () {
    $scope.resetActors();
  };



  var timeoutDuration = 1000;

  // Give each block of code it's own scope. Only one command can be highlighted per block.
  $scope.executeCodeBlock = function(codeBlock) {
    var commandIndex = 0;
    executeCode(codeBlock, commandIndex);
  };

  // execute a specific line inside a specifc block of code.
  var executeCode = function(codeBlock, commandIndex)
  {
    if($scope.currentlyExecuting == true && commandIndex < codeBlock.length)
    {
      var currentCommand = codeBlock[commandIndex];
      currentCommand.currentlyExecuting = true; // Highlight command that is currently running.
      var functionName = currentCommand.execute;
      commandFactory[functionName](currentCommand, $scope.player, $scope.gameData.GetCurrentMap());

      $timeout(function ()
      {
        currentCommand.currentlyExecuting = false;
        executeCode(codeBlock,commandIndex+1);
      }, timeoutDuration);
      // Don't check for victory until the player gets to the end of his path.
      $timeout($scope.checkVictory, timeoutDuration * 2); // add 2000 to account for animation time. .actor transition = 2s
    }
  }
});

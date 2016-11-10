/**
 * Created by IanGallacher on 11/9/2016.
 */


app.controller('gameController', function($scope, $timeout, commandFactory) {

  var gameContext = $scope;

  // Definition of terms:
  // commandContext: an object that contains a "commandBlock" and a "commandIndex." Use this instead of a reference to the command object to easily determine which command should be executed next.
  // stack: a list of commands. The most recently added one is the command that is currently running.
  //        Once a command finishes, it calls gameController.CommandFinished().
  //        The CommandFinished sees if there is a next command in that

  var stack = []; // the stack object takes an array of "command contexts"



  var timeoutDuration = 1000;

  // Give each block of code it's own scope. Only one command can be highlighted per block.
  $scope.executeCodeBlock = function(codeBlock) {
    var commandIndex = 0;

    var commandContext = {block: codeBlock, index: commandIndex};

    executeCodeLine(commandContext);
  };



  // execute a specific line inside a specific block of code.
  var executeCodeLine = function(commandContext)
  {
    stack.push(commandContext); // Once the current command finishes, this data is needed to determine the next command to execute.


    // assert(commandContext.index < commandContext.block.length) // Javascript does not have built in asserts yet, but this is still a good thing to lookout for.
    if(gameContext.currentlyExecuting == true)
    {
      var currentCommand = commandContext.block[commandContext.index];
      currentCommand.currentlyExecuting = true; // Highlight command that is currently running.

      commandFactory[currentCommand.functionName](currentCommand, gameContext.player, $scope);//$scope.player, $scope.gameData.GetCurrentMap());

      // Don't check for victory until the player gets to the end of his path.
      $timeout(gameContext.checkVictory, timeoutDuration * 2); // add 2000 to account for animation time. .actor transition = 2s
    }
  };

  $scope.duplicateLastStackEntry = function(numberOfTimesToDuplicate)
  {
    var commandContext = stack.pop();

    for(var x = 0; x < numberOfTimesToDuplicate; x++)
    {
      stack.push( {block: commandContext.block, index: commandContext.index } );
    }
  };

  $scope.commandFinished = function()
  {
      var commandContext = stack.pop();
      if(commandContext)
      {
        var currentCommand = commandContext.block[commandContext.index]; //only needed to control highlighting.


        var nextCommandContext = {block: commandContext.block, index: commandContext.index + 1};
        if(nextCommandContext.index < nextCommandContext.block.length) { // Is there another command to run?

          $timeout(function () // Commands only update data. There needs to be time to animate. Timeout delays the the execution of the next command until the actors have finished animating.
          {
            currentCommand.currentlyExecuting = false; // Stop highlighting the previous command.
            executeCodeLine(nextCommandContext);
          }, timeoutDuration);
        } else { // The codeBlock has completed, time to move up the stack and see if there are more commands to run.

          $timeout(function () // Commands only update data. There needs to be time to animate. Timeout delays the the execution of the next command until the actors have finished animating.
          {
            currentCommand.currentlyExecuting = false; // Stop highlighting the previous command.
          }, timeoutDuration);
          $scope.commandFinished(); // Due to the nature of recursion, a codeBlockFinished() function is not needed.
        }
      }
  };

});



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

  var stack = []; // the stack object takes an array of "command contexts." This stores the next command for nested execution.



  var timeoutDuration = 1500; // make sure this matches the animation durations in style.scss.




  $scope.startCodeExecution = function(){
    $scope.executeCodeBlock($scope.codeBank.contents);
  };

  var executeFunctionByCommandContext = function(commandContext)  {
    var currentCommand = commandContext.block[commandContext.index];
    currentCommand.currentlyExecuting = true; // Highlight command that is currently running.

    commandFactory[currentCommand.functionName](currentCommand, gameContext.player, $scope);
  };




  // Give each block of code it's own scope. Only one command can be highlighted per block.
  $scope.executeCodeBlock = function(codeBlock, timesToRepeat) {
    timesToRepeat = timesToRepeat || 1;

    var commandContext = {block: codeBlock, index: 0, loopsRemaining: timesToRepeat};

    // test for empty nested commands.
    if(commandContext.block.length == 0)
    {
      var commandContext = stack[stack.length-1];
      var command = commandContext.block[commandContext.index];
      command.isValid = false;
      command.errorMessage = "For loops can not be empty.";
      command.currentlyExecuting = false;
    }
    else {
      stack.push(commandContext); // Once the current command finishes, this data is needed to determine the next command to execute.


      executeCodeLine(commandContext);
    }
  };

  // execute a specific line inside a specific block of code.
  var executeCodeLine = function(commandContext)
  {
    // assert(commandContext.index < commandContext.block.length) // Javascript does not have built in asserts yet, but this is still a good thing to lookout for.
    if(gameContext.currentlyExecuting == true)
    {
      executeFunctionByCommandContext(commandContext);

      // Don't check for victory until the player gets to the end of his path.
      $timeout(gameContext.checkVictory, timeoutDuration * 2); // add 2000 to account for animation time. .actor transition = 2s
    }
  };

  // Remember, when the argument "previousCommandContext" reaches this function, it has already been removed from our stack. (not the javascript stack, our interpreter's stack.)
  var determineNextLineToExecute = function(previousCommandContext) {
    // Do we need to repeat the previous command?

    if(previousCommandContext.index == previousCommandContext.block.length) return;



    var nextCommandContext = { block: previousCommandContext.block, index: previousCommandContext.index + 1, loopsRemaining: previousCommandContext.loopsRemaining};
    if(nextCommandContext.index < nextCommandContext.block.length) { // Is there another command to run?

      stack.push(nextCommandContext); // Once the current command finishes, this data is needed to determine the next command to execute.
      return nextCommandContext;

    } else { // The codeBlock has completed, move up the stack, unless the block has to repeat again.
      previousCommandContext.loopsRemaining -= 1;
      if(previousCommandContext.loopsRemaining > 0) {
        var returnCommandContext = { block: previousCommandContext.block, index: 0, loopsRemaining: previousCommandContext.loopsRemaining};
        stack.push(returnCommandContext);
        return returnCommandContext;
      }

      $scope.commandFinished(); // The most recent command has been removed from the stack. Continue from where the nesting left off.
    }
  };

  // Execute the next line of code and stop highlighting the previous line of code.
  $scope.commandFinished = function()
  {
    var previousCommandContext = stack.pop(); // Removes the command that was currently running from the stack.
    if(previousCommandContext)
    {
      var nextCommandContext = determineNextLineToExecute(previousCommandContext);


      // Run the command after a delay to allow time to animate the changes from the previous command.
      $timeout(function ()
      {
        var previousCommand = previousCommandContext.block[previousCommandContext.index]; // only needed to control highlighting.
        previousCommand.currentlyExecuting = false; // Stop highlighting the previous command.
        if(nextCommandContext)
          executeCodeLine(nextCommandContext);
      }, timeoutDuration);
    }
  };

});



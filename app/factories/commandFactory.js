/**
 * Created by IanGallacher on 10/13/2016.
 */
app.service('commandFactory', function() {



  var command =
  this.rotateRight = function()
  {
    return {
      class: 'command',
      name: 'Rotate Right',
      direction: 'left',
      currentlyExecuting: false,
      isValid: true,
      functionName: 'executeRotateRight' // Use commandFactory[currentCommand.functionName] to execute functions.
    };
  };

  // every command takes command, actor, and gameMap as arguments, even if it does not need them.
  this.executeRotateRight = function(command, actor, gameContext) {
    actor.rotateRight(command.direction);
    gameContext.commandFinished();
  };

  this.rotateLeft = function()
  {
    return {
      class: 'command',
      name: 'Rotate Left',
      direction: 'left',
      currentlyExecuting: false,
      isValid: true,
      functionName: 'executeRotateLeft',
      mouseOver: false
    };
  };

  this.executeRotateLeft = function(command, actor, gameContext) {
    actor.rotateLeft(command.direction);
    gameContext.commandFinished();
  };

  this.forLoop = function()
  {
    return {
      class: 'command',
      contents: [], // the commands we iterate through when running the forLoop.
      name: 'For Loop', // must be named For Loop to be compatible with the ng-if (display dropzone) in codeBank.html.
      loops: 3,
      currentlyExecuting: false,
      isValid: true,
      functionName: 'executeForLoop',
      mouseOver: false,
      dropdownOpen: false
    };
  };



  this.executeForLoop = function(command, actor, gameContext) {
    gameContext.executeCodeBlock(command.contents, command.loops);
    // gameContext.commandFinished();
  };


  this.move = function()
  {
    return {
      class: 'command',
      name: 'Move Forward',
      direction: 'up',
      currentlyExecuting: false,
      isValid: true,
      functionName: 'executeMove',
      mouseOver: false
    };
  };


  // Takes into account the new player position before moving.
  // var lookForCollision = function(actor, gameMap)
  // {
  //     if(actor.rotation == 0)
  //     {
  //       return(gameMap[actor.y-1][actor.x] == "0");
  //     }
  //     else if(actor.rotation == 90)
  //     {
  //       return(gameMap[actor.y][actor.x+1] == "0");
  //     }
  //     else if(actor.rotation == 180)
  //     {
  //       return(gameMap[actor.y+1][actor.x] == "0");
  //     }
  //     else if(actor.rotation == 270)
  //     {
  //       return(gameMap[actor.y][actor.x-1] == "0");
  //     }
  // };
  var currentCollision = function(actor, gameMap)
  {
      return(gameMap[actor.y][actor.x] == "0");
  };

  this.executeMove = function(command, actor, gameContext)
  {
    actor.move(command.direction);

    // Move the character BEFORE checking for collisions. Give the user a chance to SEE what went wrong, rather than a simple error message.
    if( currentCollision(actor, gameContext.gameData.GetCurrentMap()) )
    {
      command.isValid = false;
      command.errorMessage = "Characters can not be moved off the map.";
      command.currentlyExecuting = false;


      gameContext.currentlyExecuting = false;
    }
    gameContext.commandFinished();
  };


  this.ifStatement = function()
  {
    return {
      class: 'command',
      contents: [], // the commands we iterate through when running the forLoop.
      name: 'If Wall in Front', // must be named 'If Wall in Front' to be compatible with the ng-if (display dropzone) in codeBank.html.
      direction: 'left',
      currentlyExecuting: false,
      isValid: true,
      functionName: 'executeIfStatement',
      mouseOver: false
    };
  };



  this.executeIfStatement = function(command, actor, gameContext) {
    if(actor.wallInFront(gameContext)) {
      gameContext.executeCodeBlock(command.contents);
    } else {
      gameContext.commandFinished();
    }
  };
});

/**
 * Created by IanGallacher on 10/13/2016.
 */
app.service('commandFactory', function() {

  this.rotateRight = function()
  {
    return {
      class: 'command',
      name: 'Rotate Right',
      direction: 'left',
      currentlyExecuting: false,
      isValid: true,
      execute: 'executeRotateRight' // Name of the function we are going to executew.
    };
  };

  // every command takes command, actor, and gameMap as arguments, even if it does not need them.
  this.executeRotateRight = function(command, actor, gameMap) {
    actor.rotateRight(command.direction);
  };

  this.rotateLeft = function()
  {
    return {
      class: 'command',
      name: 'Rotate Left',
      direction: 'left',
      currentlyExecuting: false,
      isValid: true,
      execute: 'executeRotateLeft'
    };
  };

  this.executeRotateLeft = function(command, actor, gameMap) {
    actor.rotateRight(command.direction);
  };

  this.forLoop = function()
  {
    return {
      class: 'command',
      contents: [],
      name: 'For Loop', // must be named For Loop to be compatible with the ng-if (display dropzone) in codeBank.html.
      direction: 'left',
      currentlyExecuting: false,
      isValid: true,
      execute: 'executeForLoop'
    };
  };



  this.executeForLoop = function(command, actor, gameMap) {
    $scope.executeCodeBlock(command.contents);
  };


  this.move = function()
  {
    return {
      class: 'command',
      name: 'Move Forward',
      direction: 'up',
      currentlyExecuting: false,
      isValid: true,
      execute: 'executeMove'
    };
  };


  // Takes into acount the new player position before moving.
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

  this.executeMove = function(command, actor, gameMap) {
    actor.move(command.direction);

    // Move the character BEFORE checking for collisions. Give the user a chance to SEE what went wrong, rather than a simple error message.
    if( currentCollision(actor, gameMap) ) {
      command.isValid = false;
      command.currentlyExecuting = false;
      $scope.currentlyExecuting = false; // Yes, this is not defined. However, by accessing an undefined variable, code execution is halted. That is a desired effect.
    }
  };
});

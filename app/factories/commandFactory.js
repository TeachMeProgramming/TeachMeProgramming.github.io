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
      execute: 'executeRotateRight'
    };
  };

  this.executeRotateRight = function(command, actor) {
    actor.rotateRight(command.direction);
  };

  this.rotateLeft = function()
  {
    return {
      class: 'command',
      name: 'Rotate Left',
      direction: 'left',
      execute: 'executeRotateLeft'
    };
  };

  this.executeRotateLeft = function(command, actor) {
    actor.rotateRight(command.direction);
  };


  this.move = function()
  {
    return {
      class: 'command',
      name: 'Move Forward',
      direction: 'up',
      execute: 'executeMove'
    };
  };

  this.executeMove = function(command, actor) {
    actor.move(command.direction);
  };
});

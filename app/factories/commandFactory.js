/**
 * Created by IanGallacher on 10/13/2016.
 */
app.service('commandFactory', function() {

  this.rotate = function()
  {
    return {
      class: 'command',
      name: 'rotate',
      direction: 'left',
      execute: 'executeRotate'
    };
  };

  this.executeRotate = function(command, actor) {
    actor.rotate(command.direction);
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

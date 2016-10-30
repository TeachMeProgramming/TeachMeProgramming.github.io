/**
 * Created by IanGallacher on 10/20/2016.
 */
app.service('actorFactory', function() {
  var factory = this;

  this.player = function(x,y) {
    return {
      class: 'actor',
      name: 'player',
      direction: 'up',
      x : x,
      y: y,
      rotation : 0,
      src: "/LearnToCode/app/images/hero.png",


      move: function() {
        if(this.direction == 'up')
        {
          this.y -= 1;
        }
        if(this.direction == 'right')
        {
          this.x += 1;
        }
        if(this.direction == 'down')
        {
          this.y += 1;
        }
        if(this.direction == 'left')
        {
          this.x -= 1;
        }
      }
    };
  };
});

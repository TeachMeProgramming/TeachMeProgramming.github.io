/**
 * Created by IanGallacher on 10/20/2016.
 */
app.service('actorFactory', function() {
  var factory = this;

  this.player = function(x,y) {
    return {
      class: 'actor',
      name: 'player',
      x : x,
      y: y,
      rotation : 0,//0,
      src: "/LearnToCode/app/images/hero.png",


      move: function() {
        if(this.rotation == 0)
        {
          this.y -= 1;
        }
        else if(this.rotation == 90)
        {
          this.x += 1;
        }
        else if(this.rotation == 180)
        {
          this.y += 1;
        }
        else if(this.rotation == 270)
        {
          this.x -= 1;
        }
      },

      rotateRight: function() {
        this.rotation = (this.rotation+90); // Don't use (this.rotation+90)%360;
                                            // If modulo is used, the jump from left facing to top facing will go
                                            // counterclockwise instead of clockwise.
                                            // In other words, there will be three "rotateLefts" instead of one "rotateRight."
      }
    };
  };
});

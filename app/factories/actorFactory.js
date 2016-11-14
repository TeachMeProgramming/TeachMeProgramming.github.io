/**
 * Created by IanGallacher on 10/20/2016.
 */
app.service('actorFactory', function() {
  this.player = function(x,y) {
    return {
      class: 'actor',
      name: 'player',
      x : x,
      y: y,
      rotation : 0,//0,
      src: "/LearnToCode/app/images/hero.png",


      move: function() {
        var absoluteRotation = this.rotation % 360;
        if(absoluteRotation == 0)
        {
          this.y -= 1;
        }
        else if(absoluteRotation == 90)
        {
          this.x += 1;
        }
        else if(absoluteRotation == 180)
        {
          this.y += 1;
        }
        else if(absoluteRotation == 270)
        {
          this.x -= 1;
        }
      },

      rotateRight: function() {
        this.rotation = (this.rotation+90); // Don't use (this.rotation+90)%360;
                                            // If modulo is used, the jump from left facing to top facing will go
                                            // counterclockwise instead of clockwise.
                                            // In other words, there will be three "rotateLefts" instead of one "rotateRight."
      },

      rotateLeft: function() {
        this.rotation = (this.rotation-90); // Don't use (this.rotation+90)%360;
                                            // If modulo is used, the jump from left facing to top facing will go
                                            // counterclockwise instead of clockwise.
                                            // In other words, there will be three "rotateLefts" instead of one "rotateRight."
      },


      wallInFront: function(gameContext) {
        var absoluteRotation = this.rotation % 360;
        if(absoluteRotation == 0 && gameContext.gameData.GetCurrentMap()[this.y-1][this.x] == '0')
        {
          return true;
        }
        else if(absoluteRotation == 90 && gameContext.gameData.GetCurrentMap()[this.y][this.x+1] == '0')
        {
          return true;
        }
        else if(absoluteRotation == 180 && gameContext.gameData.GetCurrentMap()[this.y+1][this.x] == '0')
        {
          return true;
        }
        else if(absoluteRotation == 270 && gameContext.gameData.GetCurrentMap()[this.y][this.x-1] == '0')
        {
          return true;
        }
        return false;
      }
    };
  };
});

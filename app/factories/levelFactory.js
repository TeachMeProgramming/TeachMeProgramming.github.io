/**
 * Created by IanGallacher on 10/13/2016.
 */
app.service('levelFactory', function(commandFactory, conditionalFactory, mapFactory) {
  var factory = this;

  this.createLevel = function(commandBank, conditionalBank, map) {
    return {
      commands: commandBank,
      conditionals: conditionalBank,
      map: map
    };
  };

  this.firstLevel = function() {
    return factory.createLevel([
      commandFactory.rotate(),
      commandFactory.rotate()
    ], [], mapFactory.getFirstLevel());
  };
});

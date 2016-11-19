/**
 * Created by IanGallacher on 10/13/2016.
 */
app.service('CommandContainerFactory', function() {

  this.makeCommandContainer = function(containerName)
  {
    this.contents = [];

    return {
      class: 'commandContainer',
      name: containerName,
      contents: [],
      currentlyExecuting: false,
      isValid: true,
      errorMessage: '',


      // Functions
      //forEach: this.contents.forEach
      removeAllCommands: function() {
        this.contents.length = 0; // In javascript, setting the length of an array to 0 clears it.
      }
    };
  };
});

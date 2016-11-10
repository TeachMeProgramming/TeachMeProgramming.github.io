/**
 * Created by IanGallacher on 10/27/2016.
 */
app.directive('gameMenu', function()
{
  return {
    restrict: 'E',
    templateUrl: '/LearnToCode/app/resources/gameMenu.html',
    scope: false,
    controller: 'gameMenu'
  }
});

app.controller('gameMenu', function($scope)
{
  $scope.currentlyExecuting = false;


  $scope.runCodeClicked = function () {
    if($scope.currentlyExecuting || $scope.codeBank.length <= 0) return;
    $scope.currentlyExecuting=true; // executeCodeLine() checks for this every frame. Be sure to set it before executeCodeLine()!


    $scope.codeBank.forEach(function(command) {
      command.isValid = true;
      //command.target.classList.remove("grabable-hover"); // CURRENTLY DOES NOT WORK
    });


    $scope.executeCodeBlock($scope.codeBank);
  };

  $scope.resetCodeClicked = function () {
    $scope.resetActors();
  };
});

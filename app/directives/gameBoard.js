/**
 * Created by IanGallacher on 10/27/2016.
 */
app.directive('gameBoard', function()
{
  return {
    restrict: 'E',
    templateUrl: '/app/resources/gameBoard.html',
    scope: false,
  }
});

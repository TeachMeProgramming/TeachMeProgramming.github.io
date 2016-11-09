/**
 * Created by IanGallacher on 10/13/2016.
 */
app.directive('codeBank', function()
{
  return {
    restrict: 'E',
    templateUrl: '/LearnToCode/app/resources/codeBank.html',
    scope: false,
    controller: 'codeBankController'
  }
});

app.controller('codeBankController', function($scope)
{
  $scope.codeBank = [];
  $scope.list=$scope.codeBank; // used for nesting code.

  $scope.mouseIn = function($event)
  {
    if($event.target.classList.contains('command'))
    {
      $event.target.classList.add("grabable-hover");
      $event.stopPropagation();
    }
  };

  $scope.mouseOut = function($event)
  {
    $event.target.classList.remove("grabable-hover");
  };
});

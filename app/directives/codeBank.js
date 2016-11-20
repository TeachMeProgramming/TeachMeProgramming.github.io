/**
 * Created by IanGallacher on 10/13/2016.
 */
app.directive('codeBank', function()
{
  return {
    restrict: 'E',
    templateUrl: '/app/resources/codeBank.html',
    scope: false,
    controller: 'codeBankController'
  }
});

app.controller('codeBankController', function($scope, CommandContainerFactory)
{
  $scope.codeBank = CommandContainerFactory.makeCommandContainer('Code');
  $scope.list=$scope.codeBank.contents; // used for nesting code.

  $scope.mouseIn = function($event, command)
  {
    command.mouseOver = true;
    $event.stopPropagation();
  };

  $scope.mouseOut = function($event, command)
  {
    command.mouseOver = false;
  };
});

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
});

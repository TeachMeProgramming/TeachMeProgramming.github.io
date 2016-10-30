/**
 * Created by IanGallacher on 10/13/2016.
 */
app.directive('commandBank', function()
{
  return {
    restrict: 'E',
    templateUrl: '/LearnToCode/app/resources/commandBank.html',
    scope: false,
    controller: 'commandBankController'
  }
});

app.controller('commandBankController', function($scope, commandFactory)
{
  
});

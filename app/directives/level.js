/**
 * Created by IanGallacher on 10/13/2016.
 */
app.directive('level', function()
{
  return {
    restrict: 'E',
    templateUrl: '/LearnToCode/app/resources/level.html',
    scope: false,
    controller: 'levelController'
  }
});



var currentLevel = 0;

var gameData = {
    commandList : [
      [ // Level 1
        "move",
        "move",
        "move",
        "move",
        "rotate"
      ],
      [ // Level 2
        "move",
        "move",
        "move",
      ]
    ],

    mapData : [
      [ // Level 1
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "E", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "P", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"]
      ],
      [ // Level 2
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "E", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "P", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"]
      ]
    ],

    GetCurrentLevelData : function() {
      return this.commandList[currentLevel];
    },

    GetCurrentMap : function() {
      return this.mapData[currentLevel];
    }
};


app.controller('levelController', function($scope, tileFactory, actorFactory, commandFactory)
{
  $scope.map = tileFactory.parseMap(gameData.GetCurrentMap());

  $scope.actors = [];
  $scope.commandBank = [];


  var setupCommands = function() {
    var currentLevelData = gameData.GetCurrentLevelData();

    for(var i = 0; i < currentLevelData.length; i++)
    {
      // if(currentLevelData[i] == "move")
      // {
      //   $scope.commandBank.push(commandFactory.move());
      // }

      var currentCommandName = currentLevelData[i];

      $scope.commandBank.push(commandFactory[currentCommandName]());
    }
  };

  var setupActors = function() {
    var currentMap = gameData.GetCurrentMap();
    for(var y = 0; y < currentMap.length; y++)
    {
      for(var x = 0; x < currentMap[y].length; x++)
      {
        if(currentMap[y][x] == "P")
        {
          $scope.player = actorFactory.player(x,y);
          $scope.actors.push($scope.player);
        }
      }
    }
  };

  setupActors();

  setupCommands();

  $scope.resetMap = function() {
    $scope.actors = [];
    // $scope.commandBank = [];
    // $scope.codeBank = [ ];
    // setupCommands();
    setupActors();
  }
});

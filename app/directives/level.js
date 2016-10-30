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




// I possibly want to watch this manually so I don't have to apply it to the scope?
var currentLevel = 0;


app.controller('levelController', function($scope, tileFactory, actorFactory, commandFactory)
{
  $scope.currentLevel = currentLevel;

  $scope.gameData = {
    commandList : [
      [ // Level 1
        "move",
        "move",
        "move"
      ],
      [ // Level 2
        "move",
        "move",
        "move",
        "move",
        "move",
        "move",
        "rotateRight",
        "rotateRight"
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
        [ "0", "0", "0", "0", "0", "0", "1", "1", "1", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "1", "0", "1", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "P", "0", "E", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
      ]
    ],

    GetCurrentCommandList : function() {
      return this.commandList[currentLevel];
    },

    GetCurrentMap : function() {
      return this.mapData[currentLevel];
    }
  };


  var setupCommands = function() {
    var currentLevelData = gameData.GetCurrentCommandList();

    for(var i = 0; i < currentLevelData.length; i++)
    {
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


  $scope.setLevel = function(level) {
    currentLevel = level;
    $scope.currentLevel = currentLevel;

    $scope.actors = [];
    $scope.commandBank = [];
    $scope.codeBank = [];

    // setupActors and setupCommands are dependant on the currentLevel variable being set properly.

    $scope.map = tileFactory.parseMap(gameData.GetCurrentMap());
    setupActors();
    setupCommands();
  };

  $scope.previousLevel = function() {
    if(!$scope.gameData.mapData.hasOwnProperty(currentLevel-1)) return;
    $scope.setLevel(currentLevel-1);
  };

  $scope.nextLevel = function() {
    if(!$scope.gameData.mapData.hasOwnProperty(currentLevel+1)) return;
    $scope.setLevel(currentLevel+1);
  };



  var gameData = $scope.gameData; // use shorthand for this file.

  $scope.map = tileFactory.parseMap(gameData.GetCurrentMap());

  $scope.actors = [];
  $scope.commandBank = [];

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

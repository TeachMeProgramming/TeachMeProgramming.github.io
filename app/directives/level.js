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
var currentLevel = 2;



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
      ],
      [ // Invalid no-win level; used for testing errors in user's code.
        "move",
        "forLoop",
        "rotateRight",
        "rotateRight",
        "rotateRight",
        "rotateRight",
        "ifStatement"
      ] // IMPORTANT: If you want to create a new level, be sure to add a new entry in BOTH gameData AND mapData.
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
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
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
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
      ],
      [ // Invalid no-win level; used for testing errors in user's code.
        [ "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "1"], //1
        [ "0", "0", "0", "0", "0", "0", "0", "P", "0", "0", "0", "0", "0", "0", "0"], //2
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //3
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //4
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //5
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //6
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //7
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //8
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //9
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //10
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //11
        [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], //12
        [ "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"]  //13
      ]// IMPORTANT: If you want to create a new level, be sure to add a new entry in BOTH gameData AND mapData.
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
        if(currentMap[y][x] == "E")
        {
          $scope.victorySquare = { x: x, y: y };
        }
      }
    }
  };


  $scope.setLevel = function(level) {
    currentLevel = level;
    $scope.currentLevel = currentLevel;

    $scope.commandBank = [];
    $scope.codeBank = [];

    // setupActors and setupCommands are dependant on the currentLevel variable being set properly.

    $scope.map = tileFactory.parseMap(gameData.GetCurrentMap());
    $scope.resetActors();
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

  $scope.checkVictory = function() {
    // If the the following line of code throws an error, Make sure the map has a victory square.
    if($scope.player.x == $scope.victorySquare.x && $scope.player.y == $scope.victorySquare.y)
    {
      $scope.nextLevel();
    }
  };



  var gameData = $scope.gameData; // use shorthand for this file.

  $scope.map = tileFactory.parseMap($scope.gameData.GetCurrentMap());

  $scope.actors = [];
  $scope.commandBank = [];

  setupActors();
  setupCommands();

  $scope.resetActors = function() {
    $scope.currentlyExecuting=false;

    $scope.actors = [];
    setupActors();


    $scope.codeBank.forEach(function(command) {
      command.isValid = true;
    });
  }
});

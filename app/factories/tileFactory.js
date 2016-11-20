app.service('tileFactory', function(actorFactory) {
  var factory = this;

  this.parseMapping = {
    "0": "emptyTile",
    "1": "pathTile",
    "E": "exitTile",
    "P": "playerTile"
  };

  this.emptyTile = function() {
    return {
      src: "/app/images/empty.png"
    }
  };

  this.pathTile = function() {
    return {
      src: "/app/images/GridTile.png"
    }
  };

  this.exitTile = function() {
    return {
      src: "/app/images/Goal.png"
    }
  };

  this.playerTile = function() {
    return {
      src: "/app/images/GridTile.png"
    }
  };

  this.parseTile = function(cell) {
    var functionName = factory.parseMapping[cell];
    return factory[functionName]();
  };

  this.parseRow = function(row) {
    var tileRow = [];
    row.forEach(function(cell) {
      tileRow.push(factory.parseTile(cell));
    });
    return tileRow;
  };

  this.parseMap = function(map) {
    var tileMap = [];
    map.forEach(function(row) {
      tileMap.push(factory.parseRow(row));
    });
    return tileMap;
  }
});

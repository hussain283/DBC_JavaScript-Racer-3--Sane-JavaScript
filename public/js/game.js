var keycodes = ["Q","P","C","M","R","U"];

function ConsoleBoard() {
}
function DOMBoard() {
}

ConsoleBoard.prototype = {
  render: function(car) {
    console.log(car.player_name, ":", car.currentPosition);
  },
  renderWinner: function(car) {
    console.log(car.player_name, "wins!");
  }
}

DOMBoard.prototype = {
  render: function(car) {
  $('#' + car.player_name).children('td').removeClass('active');
  $('#' + car.player_name).children('td').eq(car.currentPosition).addClass('active');
  },
  renderWinner: function(car) {
    $('.winner').text(car.player_name + " is the winner!!!");
  }
}

function Game(trackLength) {
  this.trackLength = trackLength;
  this.cars = [];
  this.board = new DOMBoard();
}

Game.prototype.start = function() {
  this.gameStartTime = new Date().getTime()
}

Game.prototype.end = function() {
  this.elapsedTime = new Date().getTime() - this.gameStartTime;
  $(document).unbind('keyup');
}

Game.prototype.addCar = function(car) {
  this.cars.push(car);
}

Game.prototype.updateBoard = function(car) {
  this.board.render(car);
  // $('#' + car.player_name).children('td').removeClass('active');
  // $('#' + car.player_name).children('td').eq(car.currentPosition).addClass('active');

  if (car.currentPosition === this.trackLength -1) {
    this.end();
    this.board.renderWinner(car);
    this.sendToServer(car.player_name);
  }
}

Game.prototype.initializeData = function() {
  var self = this;
  $.ajax({
    url: "/game/" + $('.racer_table').attr('data-id') + "/start",
    type: "get",
    dataType: "json"
  }).done(function(data){
    for (var i in data.players) {
      car = new RaceCar(data.players[i].player.name,keycodes[i]);
      self.addCar(car);
    }
  });
}

Game.prototype.sendToServer = function(winner) {
  $.ajax({
    url: "/game/end",
    type: "post",
    data: {game_id: $('.racer_table').attr('data-id'), winner_name: winner, elapsed_time: this.elapsedTime, is_finished: true}
  });
}

Game.prototype.onKeyup = function(keyCode) {
  for (var i=0 ; i < this.cars.length; i++) {
    if (this.cars[i].keycode.charCodeAt(0) === keyCode) {
      this.cars[i].advance();
      this.updateBoard(this.cars[i]);
    }
  }
}
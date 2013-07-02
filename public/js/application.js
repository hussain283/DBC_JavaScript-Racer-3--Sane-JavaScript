$(document).ready(function() {
  var keycodes = ["Q","P","C","M","R","U"];
  var game = new Game(12);

  $.ajax({
    url: "/game/" + $('.racer_table').attr('data-id') + "/start",
    type: "get",
    dataType: "json"
  }).done(function(data){
    for (var i in data.players) {
      car = new RaceCar(data.players[i].player.name,keycodes[i])
      game.addCar(car);
    }
    game.start();
  });

  $(document).on('keyup',function(e){ game.onKeyup(e.keyCode) });

  function RaceCar(player_name,keycode) {
    this.currentPosition = 0;
    this.player_name = player_name;
    this.keycode = keycode;
  };

  RaceCar.prototype.advance = function(element) {this.currentPosition ++;};

  RaceCar.prototype.finished = function() {
    return this.currentPosition === (game.trackLength - 1)
  }

  function Game(trackLength) {
    this.trackLength = trackLength;
    this.cars = [];
  }

  Game.prototype.start = function() {
    this.gameStartTime = new Date().getTime()
  }

  Game.prototype.addCar = function(car) {
    this.cars.push(car);
  }

  Game.prototype.updateBoard = function(car) {

    $('#' + car.player_name).children('td').removeClass('active');
    $('#' + car.player_name).children('td').eq(car.currentPosition).addClass('active');

    if (car.finished()) {
      this.end();
      this.declareWinner(car);
      this.sendToServer(car.player_name);
    }
  }

  Game.prototype.end = function() {
    this.elapsedTime = new Date().getTime() - this.gameStartTime;
    $(document).unbind('keyup');
  }

  Game.prototype.declareWinner = function(car) {
   $('.winner').text(car.player_name + " is the winner!!!");
  }

  Game.prototype.sendToServer = function(winner) {
    $.ajax({
      url: "/game/end",
      type: "post",
      data: {game_id: $('.racer_table').attr('data-id'), winner_name: winner, elapsed_time: this.elapsedTime}
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

});

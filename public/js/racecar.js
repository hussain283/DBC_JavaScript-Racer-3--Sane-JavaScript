 function RaceCar(player_name,keycode) {
    this.currentPosition = 0;
    this.player_name = player_name;
    this.keycode = keycode;
  };

  RaceCar.prototype.advance = function(element) {this.currentPosition ++;};

  RaceCar.prototype.finished = function() {
    return this.currentPosition === (game.trackLength - 1)
  }

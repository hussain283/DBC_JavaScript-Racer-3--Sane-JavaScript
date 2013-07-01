$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  $(document).on('keyup',function(e){

    if (e.keyCode == 81) {
      car1.advance('#player1_strip');
    }

    if (e.keyCode == 80) {
      car2.advance('#player2_strip');
    }
  });

  car1 = new RaceCar('Player 1');
  car2 = new RaceCar('Player 2');

  function RaceCar(player_name) {
    this.currentPosition = 0;
    this.player_name = player_name;
  };

  RaceCar.prototype.advance = function(element) {
    $(element).children('td').removeClass('active');
    $(element).children('td').eq(this.currentPosition).addClass('active');
    this.currentPosition ++;

    if (this.finished(element)) { 
      this.endGame(); 
      $('.winner').text(this.player_name + " is the winner!!!");
    } 
  };

  RaceCar.prototype.finished = function(element) {
    if (this.currentPosition === (($(element).children('td').length))) {return true;}
    return false;
  }

  RaceCar.prototype.endGame = function() {
    $(document).unbind('keyup');
  }

});

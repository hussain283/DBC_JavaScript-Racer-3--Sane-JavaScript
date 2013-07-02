$(document).ready(function() {
  var game = new Game(12);

  game.initializeData();
  game.start();

  $(document).on('keyup',function(e){ game.onKeyup(e.keyCode) });
 

});

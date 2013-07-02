get '/jeffreytest' do
  @somethings = %w(foo bar baz qux)
  erb :multi, :layout => false
end



get '/' do
  @games = Game.order(:seconds_taken_for_victory)
  erb :index
end

get "/game/create" do 
  @game = Game.create()
  redirect "/game/#{@game.id}/add_player"
end

get "/game/:game_id/add_player" do
  @game = Game.find(params[:game_id])
  @player = Player.new
  @players = Player.all
  erb :play
end

post "/game/:game_id/player/create" do
  @game = Game.find(params[:game_id])
  @player = Player.find_or_create_by_name(params[:player])
  @game.add_player(@player)
  @players = Player.all
  erb :play
end

get "/game/:game_id/start" do |game_id|
  if request.xhr?
    content_type :json
    game = Game.find(game_id)
    { game: game, players: game.players}.to_json
  else
    @game = Game.find(game_id)
    erb :race_track
  end

end

post "/game/end" do
  game = Game.find(params[:game_id])
  player = Player.find_by_name(params[:winner_name])
  game.update_attributes(winner_id: player.id,
                         seconds_taken_for_victory: params[:elapsed_time],
                         is_finished: params[:is_finished])
  redirect "/"
end

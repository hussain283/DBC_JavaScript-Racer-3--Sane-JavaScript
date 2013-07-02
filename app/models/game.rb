class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_many :game_players
  has_many :players, through: :game_players

  belongs_to :winner, class_name: "Player", foreign_key: "winner_id"

  def add_player(player)
    unless self.players.include? player
      self.players << player
    end
  end

end

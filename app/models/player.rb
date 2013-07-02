class Player < ActiveRecord::Base
  # Remember to create a migration!
  has_many :game_players
  has_many :games, through: :game_players

  validates :name, :presence => true
  validates :name, :uniqueness => true
  
end  

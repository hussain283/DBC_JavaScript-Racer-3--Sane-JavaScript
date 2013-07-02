class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.timestamps
    end

    create_table :games do |t|
      t.integer :winner_id
      t.integer :seconds_taken_for_victory
      t.boolean :is_finished, default: false
      t.timestamps
    end

    create_table :game_players do |t|
      t.references :player, :game
      t.timestamps
    end
  end
end

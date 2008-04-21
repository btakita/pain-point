class CreateVotes < ActiveRecord::Migration
  def self.up
    create_table :votes do |t|
      t.integer :user_id
      t.integer :pain_point_id
      t.column :state, :string, :null => :no, :default => 'neutral'
      t.timestamps
    end
  end

  def self.down
    drop_table :votes
  end
end

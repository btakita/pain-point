class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :pain_point

  validates_presence_of :user_id
  validates_presence_of :pain_point_id
  validates_uniqueness_of :user_id, :scope => [:pain_point_id]

  acts_as_state_machine :initial => :neutral
  state :neutral
  state :up
  state :down

  event :up_vote do
    transitions :from => :neutral, :to => :up
    transitions :from => :down, :to => :up
    transitions :from => :up, :to => :neutral
  end
  alias_method :up_vote, :up_vote!

  event :down_vote do
    transitions :from => :neutral, :to => :down
    transitions :from => :up, :to => :down
    transitions :from => :down, :to => :neutral
  end
  alias_method :down_vote, :down_vote!
end

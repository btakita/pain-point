class PainPoint < ActiveRecord::Base
  class << self
    def all_user_data(user)
      PainPoint.find(:all).map do |pain_point|
        pain_point.user_data(user)
      end
    end
  end

  belongs_to :user
  validates_presence_of :name

  def user_data(user)
    vote = user ? user.votes.find_by_pain_point_id(id) : nil
    {
      'id' => id,
      'name' => name,
      'vote_state' => vote ? vote.state : 'neutral'
    }
  end
end

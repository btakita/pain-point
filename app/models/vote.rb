class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :pain_point

  validates_presence_of :user_id
  validates_presence_of :pain_point_id
  validates_uniqueness_of :user_id, :scope => [:pain_point_id]
end

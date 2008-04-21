class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :pain_point
end

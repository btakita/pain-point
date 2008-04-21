require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe VoteSubmissionsController do
  attr_reader :user

  before do
    @user = users(:quentin)
  end

  describe "POST create" do
    attr_reader :pain_point
    before do
      @pain_point = pain_points(:software_complexity)
      user.votes.pain_points.should_not include(pain_point)
    end

    should_require_login do
      post :create, :pain_point_id => pain_point.id
    end

    describe "when logged in" do
      before do
        login_as :quentin
      end

      describe "and passed valid data" do
        it "creates a Vote" do
          post :create, :pain_point_id => pain_point.id
          user.reload
          user.votes.pain_points.should include(pain_point)
        end
      end
    end
  end
end

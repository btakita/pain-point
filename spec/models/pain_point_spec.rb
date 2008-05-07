require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe PainPoint do
  attr_reader :pain_point
  describe "Validations" do
    should_validate_presence_of PainPoint, :name
  end

  describe ".all_user_data" do
    attr_reader :vote, :user
    before do
      @user = users(:quentin)
    end

    it "returns an Array of Hashes representing all of the PainPoints in the database with their vote states for the pased in User" do
      pain_point_data = PainPoint.all_user_data(user)
      pain_point_data.length.should == PainPoint.count

      pain_point_data.should include(pain_points(:slow_tests).user_data(user))
      pain_point_data.should include(pain_points(:software_complexity).user_data(user))
    end
  end

  describe "#score" do
    describe "when more users vote up than down" do
      before do
        @pain_point = pain_points(:unclear_domain)
        pain_point.votes.count.should == 0
        users(:quentin).votes.create!(:pain_point_id => pain_point.id).up_vote
        users(:suzy).votes.create!(:pain_point_id => pain_point.id).up_vote
        users(:betty).votes.create!(:pain_point_id => pain_point.id).up_vote
        users(:mike).votes.create!(:pain_point_id => pain_point.id).down_vote
        pain_point.votes.count.should == 4
      end

      it "returns a positive value" do
        pain_point.score.should == 2
      end
    end

    describe "when more users vote down than up" do
      before do
        @pain_point = pain_points(:unclear_domain)
        pain_point.votes.count.should == 0
        users(:quentin).votes.create!(:pain_point_id => pain_point.id).down_vote
        users(:suzy).votes.create!(:pain_point_id => pain_point.id).down_vote
        users(:betty).votes.create!(:pain_point_id => pain_point.id).down_vote
        users(:mike).votes.create!(:pain_point_id => pain_point.id).up_vote
      end

      it "returns a positive value" do
        pain_point.score.should == -2
      end
    end
  end

  describe "#user_data" do
    describe "when the User is nil" do
      before do
        @pain_point = pain_points(:slow_tests)
      end

      it "returns a Hash with a vote_state of neutral" do
        pain_point.user_data(nil).should == {
          "type" => "PainPoint",
          "attributes" => {
            "id" => pain_point.id,
            "name" => pain_point.name,
            "vote_state" => 'neutral'
          }
        }
      end
    end

    describe "when the User does not have a Vote for the PainPoint" do
      attr_reader :user
      before do
        @user = users(:quentin)
        @pain_point = pain_points(:software_complexity)
        user.votes.pain_points.should_not include(pain_point)
      end

      it "returns a Hash of the PainPoint with the vote_state being neutral" do
        pain_point.user_data(user).should == {
          "type" => "PainPoint",
          "attributes" => {
            "id" => pain_point.id,
            "name" => pain_point.name,
            "vote_state" => 'neutral'
          }
        }
      end
    end

    describe "when the User has a Vote for the PainPoint" do
      attr_reader :vote, :user
      before do
        @vote = votes(:quentin_slow_tests)
        vote.up_vote
        @user = vote.user
        @pain_point = vote.pain_point
      end

      it "returns a Hash of the PainPoint with the vote_state for the passed in User" do
        pain_point.user_data(user).should == {
          "type" => "PainPoint",
          "attributes" => {
            "id" => pain_point.id,
            "name" => pain_point.name,
            "vote_state" => vote.state
          }
        }
      end
    end
  end
end

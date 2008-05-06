require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe PainPoint do
  describe "Validations" do
    should_validate_presence_of PainPoint, :name
  end

  describe ".all_user_data" do
    attr_reader :vote, :user, :pain_point
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

  describe "#user_data" do
    describe "when the User is nil" do
      attr_reader :pain_point
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
      attr_reader :user, :pain_point
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
      attr_reader :vote, :user, :pain_point
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

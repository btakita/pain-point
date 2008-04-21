require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe Vote do
  describe "Validations" do
    describe "#user_id" do
      it "must not be blank" do
        vote = Vote.new
        vote.user_id = ""
        vote.should_not be_valid
        vote.errors[:user_id].should_not be_empty
      end
    end

    describe "#pain_point_id" do
      it "must not be blank" do
        vote = Vote.new
        vote.pain_point_id = ""
        vote.should_not be_valid
        vote.errors[:pain_point_id].should_not be_empty
      end
    end

    describe "#user_id and #pain_point" do
      it "must be unique" do
        vote = votes(:quentin_slow_tests)
        user_id = vote.user_id
        pain_point_id = vote.pain_point_id

        new_vote = Vote.new(:user_id => user_id, :pain_point_id => pain_point_id)
        new_vote.should_not be_valid
        new_vote.errors[:user_id].should_not be_empty
      end
    end
  end
end

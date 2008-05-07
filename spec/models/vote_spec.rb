require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe Vote do
  describe "Associations" do
    describe ".up" do
      it "returns Votes that have a vote_state of up" do
        up_votes = Vote.up
        up_votes.should_not be_empty
        up_votes.each do |up_vote|
          unless up_vote.state == 'up'
            raise "Vote state for #{up_vote.inspect} should be up"
          end
        end
        (Vote.find(:all) - up_votes).each do |not_up_vote|
          if not_up_vote.state == 'up'
            raise "Vote state for #{not_up_vote.inspect} should be not be up"
          end
        end
      end
    end

    describe ".down" do
      it "returns Votes that have a vote_state of down" do
        down_votes = Vote.down
        down_votes.should_not be_empty
        down_votes.each do |down_vote|
          unless down_vote.state == 'down'
            raise "Vote state for #{down_vote.inspect} should be down"
          end
        end
        (Vote.find(:all) - down_votes).each do |not_down_vote|
          if not_down_vote.state == 'down'
            raise "Vote state for #{not_down_vote.inspect} should be not be down"
          end
        end
      end
    end
  end
  
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

  describe "State Transitions" do
    attr_reader :vote
    before do
      @vote = votes(:quentin_slow_tests)
    end

    describe "#up_vote" do
      describe "when in neutral state" do
        before do
          vote.state.should == 'neutral'
        end

        it "transitions to up state" do
          vote.up_vote
          vote.state.should == 'up'
        end
      end

      describe "when in down state" do
        before do
          vote.state = 'down'
          vote.save!
        end

        it "transitions to up state" do
          vote.up_vote
          vote.state.should == 'up'
        end
      end

      describe "when in up state" do
        before do
          vote.state = 'up'
          vote.save!
        end

        it "transitions to neutral state" do
          vote.up_vote
          vote.state.should == 'neutral'
        end
      end
    end

    describe "#down_vote" do
      describe "when in neutral state" do
        before do
          vote.state.should == 'neutral'
        end

        it "transitions to down state" do
          vote.down_vote
          vote.state.should == 'down'
        end
      end

      describe "when in down state" do
        before do
          vote.state = 'down'
          vote.save!
        end

        it "transitions to neutral state" do
          vote.down_vote
          vote.state.should == 'neutral'
        end
      end

      describe "when in up state" do
        before do
          vote.state = 'up'
          vote.save!
        end

        it "transitions to down state" do
          vote.down_vote
          vote.state.should == 'down'
        end
      end
    end
  end
end

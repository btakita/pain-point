require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe "votes.yml" do
  attr_reader :vote

  describe "quentin_slow_tests" do
    before do
      @vote = votes(:quentin_slow_tests)
    end

    it "is associated with quentin" do
      vote.user.should == users(:quentin)
    end

    it "is associated with slow_tests" do
      vote.pain_point.should == pain_points(:slow_tests)
    end

    it "is in the neutral state" do
      vote.state.should == 'neutral'
    end
  end

  describe "suzy_software_complexity" do
    before do
      @vote = votes(:suzy_software_complexity)
    end

    it "is associated with suzy" do
      vote.user.should == users(:suzy)
    end

    it "is associated with software_complexity" do
      vote.pain_point.should == pain_points(:software_complexity)
    end

    it "is in the down state" do
      vote.state.should == 'down'
    end
  end

  describe "mike_software_complexity" do
    before do
      @vote = votes(:mike_software_complexity)
    end

    it "is associated with mike" do
      vote.user.should == users(:mike)
    end

    it "is associated with software_complexity" do
      vote.pain_point.should == pain_points(:software_complexity)
    end

    it "is in the up state" do
      vote.state.should == 'up'
    end
  end
end
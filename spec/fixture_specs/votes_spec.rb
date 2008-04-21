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
  end
end
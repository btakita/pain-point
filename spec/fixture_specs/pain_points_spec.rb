require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe "pain_points.yml" do
  attr_reader :pain_point

  describe "slow_tests" do
    before do
      @pain_point = pain_points(:slow_tests)
    end

    it "is valid" do
      pain_point.should be_valid
    end
  end

  describe "software_complexity" do
    before do
      @pain_point = pain_points(:software_complexity)
    end

    it "is valid" do
      pain_point.should be_valid
    end
  end

  describe "unclear_domain" do
    before do
      @pain_point = pain_points(:unclear_domain)
    end

    it "is valid" do
      pain_point.should be_valid
    end

    it "has no votes" do
      pain_point.votes.count.should == 0
    end
  end
end
require File.dirname(__FILE__) + '/../../spec_helper'

describe Views::PainPoints::PainPoint do
  attr_reader :pain_point

  describe "when the current_user has voted the PainPoint up" do
    attr_reader :vote
    before(:each) do
      @vote = votes(:quentin_slow_tests)
      @pain_point = vote.pain_point
      @current_user = vote.user
    end
  end
end

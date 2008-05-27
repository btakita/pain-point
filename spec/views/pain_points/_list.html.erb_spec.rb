require File.dirname(__FILE__) + '/../../spec_helper'

describe "/pain_points/_list" do
  attr_reader :pain_points
  before(:each) do
    @pain_points = PainPoint.find(:all)
    pain_points.should_not be_empty
    render 'pain_points/_list'
  end

  it "renders PainPoint list" do
    pain_points.each do |pain_point|
      unless response.body.include?(pain_point.name)
        raise "response.body should include #{pain_point.name}"
      end
    end
  end

  it "renders a create PainPoint form" do
    doc = Hpricot(response.body)
    doc.at("form[@action=#{pain_points_path}]").should_not be_nil
  end
end

require File.expand_path("#{File.dirname(__FILE__)}/../../spec_helper")

describe "/pain_points/_list" do
  attr_reader :pain_points
  before(:each) do
    @pain_points = PainPoint.find(:all)
    pain_points.should_not be_empty
    render 'pain_points/_list'
  end

  it "renders PainPoint list" do
    doc = Hpricot(response.body)
    pain_points.each do |pain_point|
      element_id = "pain_point_#{pain_point.id}"
      unless doc.at("##{element_id}")
        raise "response should include an element with the id #{element_id}"
      end

      unless response.body.include?(pain_point.name)
        raise "response.body should include #{pain_point.name}"
      end
    end
  end

  it "renders a create PainPoint form" do
    doc = Hpricot(response.body)
    doc.at("form[@action=#{pain_points_path}]").should_not be_nil
  end

  it "links the PainPoint to edit_pain_point_path" do
    doc = Hpricot(response.body)
    pain_points.each do |pain_point|
      doc.at("a[@href='#{edit_pain_point_path(pain_point)}']").should_not be_nil
    end
  end
end

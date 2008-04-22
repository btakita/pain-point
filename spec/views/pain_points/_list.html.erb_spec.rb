require File.expand_path("#{File.dirname(__FILE__)}/../../spec_helper")

describe "/pain_points/_list" do
  attr_reader :all_pain_points
  before(:each) do
    @all_pain_points = PainPoint.find(:all)
    all_pain_points.should_not be_empty
    do_render
  end

  def do_render
    render 'pain_points/_list'
  end

  it "renders PainPoint list" do
    doc = Hpricot(response.body)
    all_pain_points.each do |pain_point|
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
    all_pain_points.each do |pain_point|
      doc.at("a[@href='#{edit_pain_point_path(pain_point)}']").should_not be_nil
    end
  end

  describe "when not logged in" do
    attr_reader :pain_point
    before do
      @pain_point = pain_points(:slow_tests)
    end

    it "renders PainPoint list" do
      response.body.should include(Views::PainPoints::Show.new(template, :pain_point => pain_point).to_s)
    end
  end

  describe "when logged in" do
    attr_reader :pain_point, :current_user
    def do_render
      @pain_point = pain_points(:slow_tests)
      @current_user = login_as(:quentin)
      vote = current_user.votes.find_by_pain_point_id(pain_point.id)
      vote.up_vote
      vote.should_not == 'neutral'
      render 'pain_points/_list'
    end

    it "renders PainPoint list" do
      response.body.should include(Views::PainPoints::Show.new(
        template,
        :user => current_user,
        :pain_point => pain_point
      ).to_s)
    end
  end
end

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

  it "renders a create PainPoint form" do
    doc = Hpricot(response.body)
    doc.at("form[@action=#{pain_points_path}]").should_not be_nil
  end

  describe "when not logged in" do
    attr_reader :pain_point
    before do
      @pain_point = pain_points(:slow_tests)
    end

    it "renders PainPoint list without User Vote data" do
      doc = Hpricot(response.body)

      script = doc.at("script")
      script.inner_html.should include("PainPoint.sync(#{PainPoint.all_user_data(nil).to_json});")
      script.inner_html.should include("PainPointsView.create()")
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

    it "renders PainPoint list with the User's Vote data" do
      doc = Hpricot(response.body)
      PainPoint.all_user_data(current_user).should_not == PainPoint.all_user_data(nil)

      script = doc.at("script")
      script.inner_html.should include("PainPoint.sync(#{PainPoint.all_user_data(current_user).to_json});")
      script.inner_html.should include("PainPointsView.create()")
    end
  end
end

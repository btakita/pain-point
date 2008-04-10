require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe PainPointsController do
  describe "GET index" do
    it "renders a list of the PaintPoints" do
      pending "fix when Erector is updated" do
        get :index
        response.body.should include(PainPoint.find(:first).name)
      end
    end
  end
end

require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe PainPointsController do
  describe "GET index" do
    it "renders a list of the PaintPoints" do
      get :index
      response.body.should include(PainPoint.find(:first).name)
    end
  end

  describe "GET new" do
    describe "when not logged in" do
      before do
        controller.send(:current_user=, nil)
      end

      it "redirects to SessionsController#new" do
        get :new
        response.should redirect_to(new_session_path)
      end
    end

    describe "when logged in" do
      before do
        login_as :quentin
      end

      it "renders a new PainPoint form" do
        get :new
        assigns[:pain_point].should be_new_record
        doc = Hpricot(response.body)
        doc.at('form').should_not be_nil
      end
    end
  end
end

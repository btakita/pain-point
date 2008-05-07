require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe PainPointsController do
  describe "GET index" do
    before do
      login_as :quentin
    end

    it "renders a list of the PaintPoints" do
      get :index
      response.body.should include(PainPoint.find(:first).name)
    end
  end

  describe "GET new" do
    should_require_login do
      get :new
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

  describe "POST create" do
    should_require_login do
      post :create, :name => "Pain Point"
    end

    describe "when logged in" do
      before do
        login_as :quentin
      end

      describe "and passed in parameters are authenticated" do
        attr_reader :name
        before do
          @name = "New Pain Point"
          @parameters = {:name => name}
          PainPoint.new(@parameters).should be_valid
          PainPoint.find_by_name(name).should be_nil
        end

        it "redirects to PainPointsController#index" do
          post :create, :pain_point => @parameters
          response.should redirect_to(pain_points_path)
        end

        it "creates a PainPoint using the passed in parameters" do
          post :create, :pain_point => @parameters
          PainPoint.find_by_name(name).should_not be_nil
        end
      end

      describe "and passed in parameters are not authenticated" do
        before do
          @parameters = {:name => nil}
          PainPoint.new(@parameters).should_not be_valid
        end

        it "renders form with error messages" do
          post :create, :pain_point => @parameters

          doc = Hpricot(response.body)
          doc.at('form').should_not be_nil
          pain_point = assigns[:pain_point]
          pain_point.errors.full_messages.should_not be_empty
          pain_point.errors.full_messages.each do |message|
            unless response.body.include?(message)
              flunk "response.body does not include #{message}"
            end
          end
        end

        it "does not create a PainPoint using the passed in parameters" do
          lambda do
            post :create, :pain_point => @parameters
          end.should_not change {PainPoint.count}
        end
      end
    end
  end

  describe "GET edit" do
    attr_reader :pain_point
    before do
      @pain_point = pain_points(:slow_tests)
    end

    should_require_login do
      get :edit, :id => pain_point.to_param
    end

    describe "when logged in" do
      before do
        login_as :quentin
      end

      it "renders a form for the PainPoint" do
        get :edit, :id => pain_point.to_param
        doc = Hpricot(response.body)
        form = doc.at('form')
        form.should_not be_nil
        form[:action].should == pain_point_path(pain_point)
        doc.at('input#pain_point_name')[:value].should == pain_point.name
      end
    end
  end

  describe "POST update" do
    attr_reader :pain_point
    before do
      @pain_point = pain_points(:slow_tests)
    end

    should_require_login do
      post :update, :id => pain_point.to_param, :pain_point => {}
    end

    describe "when logged in" do
      before do
        login_as :quentin
      end

      describe "and save is successful" do
        before do
          mock.proxy(PainPoint).find(pain_point.to_param) {pain_point}
          mock.proxy(pain_point).save {true}
        end

        it "persists the PainPoint change to the database" do
          new_name = "The new name"
          pain_point.name.should_not == new_name

          lambda do
            post :update, :id => pain_point.to_param, :pain_point => {:name => new_name}
          end.should change {pain_point.name}.to(new_name)
        end

        it "redirects to pain_points_path" do
          new_name = "The new name"
          pain_point.name.should_not == new_name

          post :update, :id => pain_point.to_param, :pain_point => {:name => new_name}
          response.should redirect_to(pain_points_path)
        end
      end

      describe "when save is unsuccessful" do
        before do
          mock.proxy(PainPoint).find(pain_point.to_param) {pain_point}
          mock.proxy(pain_point).save do
            pain_point.errors.add(:name, "is wrong")
            false
          end
        end

        it "renders the edit form and notify the user about the errors" do
          post :update, :id => pain_point.to_param, :pain_point => {:name => 'test'}

          response.body.should include("Name is wrong")
        end
      end
    end
  end
end

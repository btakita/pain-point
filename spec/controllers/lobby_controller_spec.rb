require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe LobbyController do
  describe "GET show" do
    it "renders the lobby" do
      get :show
      response.should be_success
      response.body.should include("Welcome to Pain Point")
    end

    it "renders PainPoint list" do
      pain_points = PainPoint.find(:all)
      pain_points.should_not be_empty
      get :show
      pain_points.each do |pain_point|
        unless response.body.include?(pain_point.name)
          raise "response.body should include #{pain_point.name}"
        end
      end
    end
    
    it "renders a create PainPoint form" do
      get :show
      doc = Hpricot(response.body)
      doc.at("form[@action=#{pain_points_path}]").should_not be_nil
    end
  end

  describe '#route_for' do
    it "maps { :controller => 'lobby', :action => 'show'} to /" do
      route_for(:controller => 'lobby', :action => "show").should == '/'
    end
  end

  describe "#params_from" do
    it "maps /content to {:controller => 'content', :action => 'show'}" do
      params_from(:get, '/').should == {:controller => 'lobby', :action => 'show'}
    end
  end
end

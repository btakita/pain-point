require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe LobbyController do
  describe "GET show" do
    it "renders the lobby" do
      get 'show'
      response.should be_success
      response.body.should include("Lobby")
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

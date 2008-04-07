require File.dirname(__FILE__) + '/../spec_helper'

describe LobbyController do
  describe "GET 'show'" do
    it "renders show" do
      get 'show'
      response.should be_success
      response.should render_template("lobby/show")
    end
  end
end

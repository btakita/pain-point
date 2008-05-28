require File.expand_path("#{File.dirname(__FILE__)}/../rails_integration_spec_helper")

describe "A User on the home page" do
  attr_reader :session_id
  before do
    get "/"
    @session_id = cookies["_pain-point_session"]
  end

  describe "when not logged in" do
    describe "clicking the up vote" do
      it "sends a message to redirect to /login" do
        pain_point = pain_points(:slow_tests)
        post(
          pain_point_up_vote_index_path(:pain_point_id => pain_point.to_param),
          {"authenticity_token" => "somethingnew"}.to_json,
          "X-Requested-With" => "XmlHttpRequest",
          "Accept" => "application/json, text/javascript, */*",
          "Content-Type" => "application/json; charset=UTF-8",
          "Cookie" => "bc_test=true; _pain-point_session=#{session_id}"
        )
        status.should == 200
        JSON.parse(@response.body).should == {'type' => 'Redirect', 'attributes' => {'href' => new_session_path}}
      end
    end
  end

  describe "when logged in" do
    attr_reader :user
    before do
      @user = users(:quentin)
      visits login_path
      post(session_path, {"login" => user.login, "password" => "test", "Cookie" => "bc_test=true; _pain-point_session=#{session_id}"})
      @session_id = cookies["_pain-point_session"]
    end

    describe "clicking the up vote" do
      it "sends the PainPoint user data json" do
        pain_point = pain_points(:slow_tests)
        post(
          pain_point_up_vote_index_path(:pain_point_id => pain_point.to_param),
          {"authenticity_token" => "somethingnew"}.to_json,
          "X-Requested-With" => "XmlHttpRequest",
          "Accept" => "application/json, text/javascript, */*",
          "Content-Type" => "application/json; charset=UTF-8",
          "Cookie" => "bc_test=true; _pain-point_session=#{session_id}"
        )
        status.should == 200
        JSON.parse(@response.body).should == pain_point.user_data(user)
      end
    end
  end
end
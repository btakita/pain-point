require File.expand_path("#{File.dirname(__FILE__)}/../rails_integration_spec_helper")

describe "A User noon the home page" do
  before do
    visits "/"
  end

  describe "clicking the up vote" do
    describe "when not logged in" do
      it "sends a message to redirect to /login" do
        pain_point = pain_points(:slow_tests)
        post(
          create_pain_point_up_vote_path(:pain_point_id => pain_point.to_param),
          {"authenticity_token" => "somethingnew"}.to_json,
          "X-Requested-With" => "XmlHttpRequest",
          "Accept" => "application/json, text/javascript, */*",
          "Content-Type" => "application/json; charset=UTF-8",
          "Cookie" => "bc_test=true; _pain-point_session=BAh7CDoOcmV0dXJuX3RvMCIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6%250ARmxhc2g6OkZsYXNoSGFzaHsABjoKQHVzZWR7ADoMY3NyZl9pZCIlNWM2NmJm%250AOWM3Nzc0MzIxMDdmYzczOWJkNDNiODNhZmY%253D--dedbb152c476b5b0189f65e5491a17dce6190a08"
        )
        status.should == 200
        JSON.parse(@response.body).should == {"redirect" => new_session_path}
      end
    end
  end
end
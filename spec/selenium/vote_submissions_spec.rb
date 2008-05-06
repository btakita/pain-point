require File.expand_path("#{File.dirname(__FILE__)}/../selenium_helper")

describe "A User on the home page" do
  before do
    open "/"
  end

  describe "clicking the up vote" do
    describe "when not logged in" do
      it "sends a message to redirect to /login" do
        click "css=.up"
        assert_location_ends_with new_session_path
      end
    end
  end
end
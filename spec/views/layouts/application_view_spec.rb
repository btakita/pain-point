require File.expand_path("#{File.dirname(__FILE__)}/../../spec_helper")

describe Views::Layouts::Application do
  attr_reader :widget, :html
  describe "#render" do
    describe "when logged in" do
      attr_reader :user
      before do
        @user = login_as(:quentin)
        @widget = Views::Layouts::Application.new(template)
        @html = widget.to_s
      end

      it "renders the User currently logged in" do
        html.should include("Logged in as #{user.login}")
      end

      it "renders logout link" do
        doc = Hpricot(html)
        doc.should_not have_link(logins_path, :method => :get)
        doc.should have_link(logins_path, :method => :delete)
      end
    end

    describe "when not logged in" do
      before do
        @widget = Views::Layouts::Application.new(template)
        @html = widget.to_s
      end

      it "renders login link" do
        doc = Hpricot(html)
        doc.should_not have_link(logins_path, :method => :get)
        doc.should_not have_link(logins_path, :method => :delete)
      end
    end
  end
end
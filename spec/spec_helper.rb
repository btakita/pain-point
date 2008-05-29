ENV["RAILS_ENV"] = "test"
dir = File.dirname(__FILE__)
require File.expand_path("#{dir}/../config/environment")
ARGV.concat ["--options", "#{dir}/spec.opts"]
require 'spec'
require 'spec/rails'
require 'hpricot'
Dir["#{dir}/spec_helpers/**/*.rb"].each do |file|
  require file
end

require 'rspec_hpricot_matchers'

Spec::Runner.configure do |config|
  config.use_transactional_fixtures = true
  config.use_instantiated_fixtures  = false
  config.fixture_path = "#{RAILS_ROOT}/spec/fixtures"
  config.global_fixtures = :all
  config.mock_with :rr

  config.include AuthenticatedTestHelper
  config.include RspecHpricotMatchers
end

module Spec::Example::ExampleMethods
  include ActionController::UrlWriter
end

class << Spec::Rails::Example::ModelExampleGroup
  def should_validate_presence_of(klass, attr)
    describe attr do
      it "is not valid when blank" do
        object = klass.new
        object.send(attr).should be_blank
        object.should_not be_valid

        object.errors[attr].should include("can't be blank")
      end
    end
  end
end

class << Spec::Rails::Example::ControllerExampleGroup
  def integrate_views?
    true
  end

  define_method("when not logged in") do
    describe "when not logged in" do
      before do
        controller.send(:current_user=, nil)
      end

      it "redirects to SessionsController#new" do
        instance_eval &blk
        response.should redirect_to(new_session_path)
      end
    end
  end

  def should_require_login(&blk)
    describe "when not logged in" do
      before do
        controller.send(:current_user=, nil)
      end

      it "redirects to SessionsController#new" do
        instance_eval &blk
        response.should redirect_to(new_session_path)
      end
    end
  end
end
Spec::Example::ExampleGroupFactory.register(:fixture_specs, Spec::Rails::Example::ModelExampleGroup)

class Spec::Rails::Example::ViewExampleGroup
  def login_as(user_id)
    user = users(user_id)
    stub(@controller).current_user {user}
    user
  end
end

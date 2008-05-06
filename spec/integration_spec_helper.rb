require 'rubygems'
require 'webrat'
dir = File.dirname(__FILE__)
require File.expand_path("#{dir}/spec_helper")

ActionController::Base.allow_forgery_protection = true
module ActionController::Rescue
  def use_rails_error_handling?
    true
  end
end

class Spec::Rails::Example::IntegrationExampleGroup < ActionController::IntegrationTest
  Spec::Example::ExampleGroupFactory.register(:integration, self)
end

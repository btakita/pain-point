ENV["RAILS_ENV"] = "test"
dir = File.dirname(__FILE__)

require "test/unit"
require File.expand_path("#{dir}/spec_helper")
require "polonium"

config = Polonium::Configuration.instance
config.app_server_engine = :mongrel
config.browser = "firefox"
config.keep_browser_open_on_failure = false

class SeleniumExampleGroup < Polonium::TestCase
  Spec::Example::ExampleGroupFactory.register(:selenium, self)
end

class Polonium::Driver
end

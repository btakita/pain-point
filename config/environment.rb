RAILS_GEM_VERSION = '2.0.2' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  config.action_controller.session = {
    :session_key => '_pain-point_session',
    :secret      => 'a2597b7c9cbef0b277dcedea4ce3219982efe8726961c72610e6650cd41d7a0964f8c948b56e6171681e82634c81f43dca64be56e6e92492d626c42ddf6ebd13'
  }
end
require 'digest/sha1'
require 'has_finder'
require 'json'

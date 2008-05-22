dir = File.dirname(__FILE__)

Dir["#{dir}/{rails_integration}/**/*_spec.rb"].each do |file|
  require file
end
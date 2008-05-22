dir = File.dirname(__FILE__)

Dir["#{dir}/{models,fixture_specs,views,controllers,helpers}/**/*_spec.rb"].each do |file|
  require file
end
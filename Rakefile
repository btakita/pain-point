# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

dir = File.dirname(__FILE__)
require(File.join(dir, 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'
Rake.application.options.trace = true

#require 'tasks/rails'
# Load Rails rakefile extensions
tasks_dir = nil
$LOAD_PATH.each do |path|
  tasks_dir = "#{path}/tasks"
  if File.exists?("#{tasks_dir}/rails.rb")
    puts tasks_dir
    tasks_dir = tasks_dir
    break
  end
end

Dir["#{tasks_dir}/*.rake"].each { |ext| load ext }
Dir["#{RAILS_ROOT}/vendor/plugins/**/tasks/**/*.rake"].sort.each do |ext|
  load ext unless ext.include?("plugin_dependencies")
end

Dir["#{RAILS_ROOT}/vendor/plugins/pivotal_core_bundle/lib/rake_extensions/**/*.rake"].sort.each do |ext|
  load ext
end

Dir["#{RAILS_ROOT}/lib/**/tasks/**/*.rake"].sort.each do |ext|
  load ext
end

Dir["#{RAILS_ROOT}/script/**/tasks/**/*.rake"].sort.each do |ext|
  load ext
end

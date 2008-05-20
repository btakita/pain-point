Rake.application.instance_variable_get("@tasks")['spec'] = nil

desc "Run all specs in the project"
task :spec do
  system("ruby spec/spec_suite.rb") || raise("Spec Suite Failed")
end

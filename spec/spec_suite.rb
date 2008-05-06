dir = File.dirname(__FILE__)
system("ruby #{dir}/unit_spec_suite.rb") || raise("Unit Spec Suite Failed")
system("ruby #{dir}/integration_spec_suite.rb") || raise("Integration Spec Suite Failed")
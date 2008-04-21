require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe PainPointsHelper do
  
  #Delete this example and add some real ones or delete this file
  it "should include the PainPointsHelper" do
    included_modules = self.metaclass.send :included_modules
    included_modules.should include(PainPointsHelper)
  end
  
end

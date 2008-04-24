require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe LobbyHelper do
  
  #Delete this example and add some real ones or delete this file
  it "should include the LobbyHelper" do
    included_modules = self.metaclass.send :included_modules
    included_modules.should include(LobbyHelper)
  end
  
end

require File.expand_path("#{File.dirname(__FILE__)}/../spec_helper")

describe PainPoint do
  describe "Validations" do
    should_validate_presence_of PainPoint, :name
  end
end

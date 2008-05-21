require File.expand_path("#{File.dirname(__FILE__)}/spec_helper")

describe "Fitnesse" do
  begin
    result = open('http://localhost:8081/SuiteAcceptance?suite')

    results_elements = Hpricot(result)/"span.test_summary_results"

    results_elements.each do |element|
      fitnesse_test_name = element.search("../a/").to_s
      fitness_test_results_text = element.inner_html

      specify fitnesse_test_name do
        assert element.classes.include?("pass"), "#{fitnesse_test_name} #{fitness_test_results_text}"
      end
    end

  rescue Errno::ECONNREFUSED
    define_method :test_connect_to_fitnesse do
      fail("Could not connect to the fitnesse server.  Perhaps you need to start it with script/fitnesse")
    end
  end
end

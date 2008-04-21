require File.dirname(__FILE__) + '/../../spec_helper'

describe "/vote_submissions/create" do
  before(:each) do
    render 'vote_submissions/create'
  end
  
  #Delete this example and add some real ones or delete this file
  it "should tell you where to find the file" do
    response.should have_tag('p', /Find me in app\/views\/vote_submissions\/create/)
  end
end

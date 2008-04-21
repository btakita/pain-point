class VoteSubmissions::VoteSubmissionsController < ApplicationController
  before_filter :login_required, :only => [:create]
end

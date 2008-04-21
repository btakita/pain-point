class VoteSubmissionsController < ApplicationController
  before_filter :login_required, :only => [:create]

  def create
    Vote.create!(
      :user_id => current_user.id,
      :pain_point_id => params[:pain_point_id]
    )
    head :ok
  end
end

class VotesController < ApplicationController
  before_filter :login_required, :only => [:create]

  def create
    Vote.create!(
      :user_id => current_user.id,
      :pain_point_id => params[:vote][:pain_point_id]
    )
  end
end

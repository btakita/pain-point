class VoteSubmissions::VoteSubmissionsController < ApplicationController
  before_filter :login_required, :only => [:create]

  protected
  def create_vote
    respond_to do |format|
      format.json do
        vote = current_user.votes.find_or_create_by_pain_point_id(params[:pain_point_id])
        yield vote
        vote.save!
        @user = current_user
        @pain_point = vote.pain_point
        render :text => @pain_point.user_data(@user).to_json
      end
    end
  end
end

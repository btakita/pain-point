class VoteSubmissions::UpVoteSubmissionsController < VoteSubmissions::VoteSubmissionsController
  def create
    Vote.create!(
      :user_id => current_user.id,
      :pain_point_id => params[:pain_point_id]
    )
    head :ok
  end
end

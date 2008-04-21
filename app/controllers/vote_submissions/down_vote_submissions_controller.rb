class VoteSubmissions::DownVoteSubmissionsController < VoteSubmissions::VoteSubmissionsController
  def create
    vote = current_user.votes.find_or_create_by_pain_point_id(params[:pain_point_id])
    vote.down_vote
    vote.save!
    head :ok
  end
end

class VoteSubmissions::UpVoteSubmissionsController < VoteSubmissions::VoteSubmissionsController
  def create
    create_vote do |vote|
      vote.up_vote
    end
  end
end

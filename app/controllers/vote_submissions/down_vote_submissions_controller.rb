class VoteSubmissions::DownVoteSubmissionsController < VoteSubmissions::VoteSubmissionsController
  def create
    create_vote do |vote|
      vote.down_vote
    end
  end
end

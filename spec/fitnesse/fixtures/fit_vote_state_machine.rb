class FitVoteStateMachine < Fit::ColumnFixture

  attr_writer :initial_state, :vote_type

  # called by fit before first cell of row
  def reset
    @user = User.find_by_login(@args[0])
    @pain_point = PainPoint.find_by_name(@args[1])
    @vote = @user.votes.find_or_create_by_pain_point_id(@pain_point.id)
  end

  # called by fit before first method call of row
  def execute
    @vote.state = @initial_state
    @vote.send(@vote_type)
  end

  def state
    @vote.state
  end

  def results
    @vote.valid? ? true : @vote.errors.full_messages.join(", ")
  end
  
end

class Views::PainPoints::Show < Erector::Widget
  def render
    li :id => "pain_point_#{pain_point.id}", :class => "pain_point" do
      vote_link 'up'
      text " "
      vote_link 'down'
      text " "
      link_to pain_point.name, edit_pain_point_path(pain_point)
    end
  end

  protected
  def vote_link(state)
    css_class = state.dup
    if @user
      vote = user.votes.find_by_pain_point_id(pain_point.id)
      if vote && vote.state == state
        css_class << " selected"
      end
    end
    link_to(
      state.capitalize,
      send("pain_point_#{state}_vote_index_path", :pain_point_id => pain_point.id),
      :method => :post,
      :class => css_class
    )
  end
end
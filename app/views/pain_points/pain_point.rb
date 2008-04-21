class Views::PainPoints::PainPoint < Erector::Widget
  def render
    li :id => "pain_point_#{pain_point.id}", :class => "pain_point" do
      vote_link 'up', 'Up'
      text " "
      vote_link 'down', 'Down'
      text " "
      link_to pain_point.name, edit_pain_point_path(pain_point)
    end
  end

  protected
  def vote_link(state, text)
    css_class = state
    if @user
      vote = user.votes.find_by_pain_point_id(pain_point.id)
      if vote && vote.state == state
        css_class << " selected"
      end
    end
    a text, :class => css_class
  end
end
class Views::PainPoints::PainPoint < Erector::Widget
  def render
    li :id => "pain_point_#{pain_point.id}", :class => "pain_point" do
      up_link
      text " "
      down_link
      text " "
      link_to pain_point.name, edit_pain_point_path(pain_point)
    end
  end

  protected
  def up_link
    css_class = "up"
    if @user
      vote = user.votes.find_by_pain_point_id(pain_point.id)
      if vote && vote.state == 'up'
        css_class << " selected"
      end
    end
    a "Up", :class => css_class
  end

  def down_link
    css_class = "down"
    if @user
      vote = user.votes.find_by_pain_point_id(pain_point.id)
      if vote && vote.state == 'down'
        css_class << " selected"
      end
    end
    a "Up", :class => css_class
  end
end
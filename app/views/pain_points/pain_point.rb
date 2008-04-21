class Views::PainPoints::PainPoint < Erector::Widget
  def render
    li :id => "pain_point_#{pain_point.id}", :class => "pain_point" do
      span "Up", :class => "up"
      text " "
      span "Down", :class => "down"
      text " "
      link_to pain_point.name, edit_pain_point_path(pain_point)
    end
  end
end
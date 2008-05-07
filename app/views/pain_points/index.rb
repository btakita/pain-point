class Views::PainPoints::Index < Erector::Widget
  def render
    text raw(helpers.render(:partial => "list"))
  end
end
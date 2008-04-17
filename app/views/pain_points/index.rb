class Views::PainPoints::Index < Views::Layouts::Application
  def content
    text raw(helpers.render(:partial => "list"))
  end
end
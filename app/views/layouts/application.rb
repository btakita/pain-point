class Views::Layouts::Application < Erector::Widget
  def render
    html do
      head do
        title "Pain Point"
      end
      body do
        content
      end
    end
  end
end
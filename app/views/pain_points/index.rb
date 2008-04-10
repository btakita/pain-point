class Views::PainPoints::Index < Views::Layouts::Application
  def content
    ul do
      pain_points.each do |pain_point|
        li pain_point.name
      end
    end
  end
end
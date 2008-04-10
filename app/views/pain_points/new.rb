class Views::PainPoints::New < Views::Layouts::Application
  def content
    unless pain_point.errors.empty?
      ul :class => 'errors' do
        pain_point.errors.full_messages.each do |error|
          li error
        end
      end
    end

    form do
      
    end
  end
end
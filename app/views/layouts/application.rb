class Views::Layouts::Application < Erector::Widget
  def render
    html do
      head do
        title "Pain Point"
        stylesheet_link_tag 'typography', :cache => true
      end

      body do
        div flash[:notice], :class => "notice"
        div flash[:error], :class => "error"
        content
      end
    end
  end

  def content
    if @block
      instance_eval &block
    end
  end
end

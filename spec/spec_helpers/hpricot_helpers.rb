module Spec
  module Matchers
    class HaveLink
      include ActionController::UrlWriter
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::UrlHelper

      def initialize(example, url, options={})
        template = example.template
        @options = options
        link = Hpricot(template.link_to('ignore-me', url, options)).at('/')
        @expected_onclick = link[:onclick]
        @expected_href = link[:href]
      end

      def matches?(doc, &block)
        @doc = doc
        if @expected_onclick
          @doc.search("a[@href=#{@expected_href}]").any? do |link|
            link[:onclick] == @expected_onclick
          end
        else
          @doc.at("a[@href=#{@expected_href}]")
        end
      end

      def failure_message
        [
          "expected #{@doc.inner_html.inspect}",
          "to have a link with url",
          @expected_href.inspect,
          "and onclick",
          @expected_onclick.inspect
        ].join("\n")
      end

      def negative_failure_message
        [
          "expected #{@doc.inner_html.inspect}",
          "not to have a link with url",
          @expected_href.inspect,
          "and onclick",
          @expected_onclick.inspect
        ].join("\n")
      end

      def protect_against_forgery?
        false
      end
    end

    def have_link(url, options={})
      HaveLink.new(self, url, options)
    end
  end
end

module HpricotHelpers
  include Spec::Matchers

  def has_element(tagname, inner_html, count=nil)
    elements = search(tagname)
    elements = elements.select { |e| e.inner_html == inner_html }
    count.nil? ? elements.length.should > 0 : elements.length.should == count
    elements
  end

  def has_form(action, onsubmit=nil)
    form = self.at("form[@action=#{action}]")
    form.should_not be_nil
    form[:onsubmit].should include(onsubmit) if onsubmit
    form
  end

  def has_hidden_field(name, value)
    inputs = search('input')
    hidden_fields = inputs.get_elements_by_name(name)
    hidden_fields.should_not be_empty
    target_field = hidden_fields.at("[@value=#{value}]")
    target_field.should_not be_nil
    target_field
  end

  def has_select_field(field_name, selected_value=nil)
    selects = search("select")
    select = selects.get_elements_by_name(field_name).first
    select.should_not == nil

    if (selected_value)
      option = select.at("option[@value=#{selected_value}]")
      option.should_not == nil
      option[:selected].should == "selected"
    end
    select
  end

  def has_check_box_field(field_name, is_selected=false)
    inputs = search('input')
    checkbox = inputs.get_elements_by_name(field_name).first
    checkbox.should_not == nil
    checkbox[:type].should == "checkbox"
    if is_selected
      checkbox[:checked].should == "checked"
    else
      checkbox[:checked].should == nil
    end
    checkbox
  end

  def has_field(field_name, field_value, tag_type="input")
    tags = search(tag_type)
    tag = tags.get_elements_by_name(field_name).first
    tag.should_not == nil
    tag[:value].should == field_value
    tag
  end

  def has_text_field(name, value)
    text_fields = self.search("input[@type=text]")
    text_fields.should_not be_empty
    text_fields.get_elements_by_name(name).any? do |text|
      text[:value].to_s == value.to_s
    end.should be_true
  end

  def has_password_field(name, value=nil)
    password_fields = self.search("input[@type=password]")
    password = password_fields.get_elements_by_name(name).first
    password.should_not be_nil
    password[:value].should == value
    password
  end

  def has_textarea_field(field_name, field_value)
    textareas = self.search("textarea")
    textareas.should_not be_empty
    textareas.any? do |textarea|
      textarea.inner_html.to_s == field_value.to_s
    end.should be_true
  end
  alias :has_rte_field :has_textarea_field

  def has_file_field(name, value)
    file_fields = self.search("input[@type=file]")
    file = file_fields.get_elements_by_name(name).first
    file.should_not be_nil
    file[:value].should == value
    file
  end

  def has_read_only(text, tag_type="input")
    self.inner_html.should include(text)
    self.at("#{tag_type}[@value=#{text}]").should == nil
  end

  def has_no_field(field_name, tag_type="input")
    tags = search(tag_type)
    tags.get_elements_by_name(field_name).should be_empty
  end

  def has_submit(name, value=nil)
    submit_tags = self.search("input[@type=submit]")
    submit = submit_tags.get_elements_by_name(name).first
    submit.should_not be_nil
    submit[:value].should == value if value
    submit
  end
end

class Hpricot::Doc
  include HpricotHelpers
end

class Hpricot::Elem
  include HpricotHelpers
end

module Hpricot
  module GetElementsByName
    def get_elements_by_name(name)
      list = Elements[]
      search('').each do |e|
        if e.is_a?(Elem) && e[:name] == name
          list << e
        end
      end
      list
    end
  end

  module Traverse
    include GetElementsByName
  end

  class Elements < Array
    include GetElementsByName
  end
end

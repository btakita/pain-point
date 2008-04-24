require 'rbconfig'

class XmlbuilderGenerator < Rails::Generator::Base
  def manifest
    record do |m|
      m.directory 'public'
      m.directory 'public/javascripts'
      m.file      'public/javascripts/xmlbuilder.js', 'public/javascripts/xmlbuilder.js'
    end
  end

protected

  def banner
    "Usage: #{$0} xmlbuilder"
  end
end

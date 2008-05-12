# I'm used to convert content from Pivotal's Trac instance. Throw me away when Trac is no longer the main source.
require "rubygems"
require "hpricot"
require "bluecloth"

dir = File.dirname(__FILE__)
system "html2markdown #{dir}/notes.trac.html > #{dir}/notes.markdown"

File.open("#{dir}/notes.html", "w") do |f|
  f.write BlueCloth.new(File.read("#{dir}/notes.markdown")).to_html
end

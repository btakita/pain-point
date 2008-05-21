require "rubygems"
require 'fit/column_fixture'
require 'fit/fit_server'
dir = File.dirname(__FILE__)
require File.expand_path("#{dir}/../../config/environment")
$LOAD_PATH.unshift "#{dir}/fixtures"

exitCode = Fit::FitServer.new.run(ARGV)
exit exitCode
class PainPointsController < ApplicationController
  before_filter :login_required, :only => [:new]

  def index
    @pain_points = PainPoint.find(:all)
  end

  def new
    @pain_point = PainPoint.new
  end
end

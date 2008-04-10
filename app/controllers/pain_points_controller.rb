class PainPointsController < ApplicationController
  def index
    @pain_points = PainPoint.find(:all)
  end
end

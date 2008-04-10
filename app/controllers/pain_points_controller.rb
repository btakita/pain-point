class PainPointsController < ApplicationController
  before_filter :login_required, :only => [:new, :create]

  def index
    @pain_points = PainPoint.find(:all)
  end

  def new
    @pain_point = PainPoint.new
  end

  def create
    @pain_point = PainPoint.new(params[:pain_point])
    if @pain_point.save
      redirect_to pain_points_path
    else
      render :template => 'pain_points/new'
    end
  end
end

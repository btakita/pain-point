class PainPointsController < ApplicationController
  before_filter :login_required, :only => [:new, :create, :edit, :update]

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

  def edit
    @pain_point = PainPoint.find(params[:id])
  end

  def update
    @pain_point = PainPoint.find(params[:id])
    if @pain_point.update_attributes(params[:pain_point])
      redirect_to pain_points_path
    else
      flash[:error] = @pain_point.errors.full_messages.join("<br>")
      render :template => 'pain_points/edit'
    end
  end
end

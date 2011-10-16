class DonationsController < ApplicationController
  before_filter :authenticate, :only => [create]
  
  def new
  
  end
  
  def index
    @donations = Donation.all
  end
  
    
  def create
    @donation = Donation.new(params[:donation])
    project = @donation.project
    if @donation.save
      unless project.nil?
        project.price += @donation.amount
        project.save
      end
      redirect_to project
    else
      flash[:error] = "Didn't save" 
      if project.nil?
        redirect_to root_url
      else 
        redirect_to project
      end
    end
  end

  def destroy

  end

  private
    
    def authenticate
      deny_access unless signed_in?
    end
end

class DonationsController < ApplicationController
  
  def new
  end

  def index
    @donations = Donation.all
  end
  
  def create
    price = params[:donation][:price]
    @project = Project.find(flash[:project_id])
    project_id = @project.id
    user_id = 1 #(current_user).id
    @donation = Donation.new( :project_id => project_id, :user_id => user_id, :amount => price)
    redirect_to project_path(@project)
  end

  def destroy

  end
  
  
end

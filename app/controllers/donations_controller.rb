class DonationsController < ApplicationController
  
  def new
  
  end
  
  def index
    @donations = Donation.all
  end

  def destroy

  end

  private
    
    def authenticate
      deny_access unless signed_in?
    end
end

class PagesController < ApplicationController
  layout :resolve_layout
  
  def home
    @requests = Request.active.request_order("recent").paginate(:page => params[:page], :per_page => 10)
  end
  
  def landing
  end
  
  def home2
  end
  
  def faq
  end
  
  def about
  end

  def contact
  end
  
  def thank_you
  end

  def thanks
  end
  private
  def resolve_layout 
    case action_name
      when "landing", "thanks"
        "landing"
      else
        "application"
      end
  end
  
  
end

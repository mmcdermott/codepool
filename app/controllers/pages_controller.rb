class PagesController < ApplicationController
  layout :resolve_layout
  
  def home
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

  private
  def resolve_layout 
    case action_name
      when "landing"
        "landing"
      else
        "application"
      end
  end
  
  
end

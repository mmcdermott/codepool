include ActionView::Helpers::NumberHelper

class Donation < ActiveRecord::Base
  belongs_to :user
  belongs_to :request
  after_create :update_request

  def update_request
    self.request.calculate_price
  end

  def dollar_amount
    return number_to_currency(self.amount)
  end
end

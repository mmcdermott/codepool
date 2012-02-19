class Submission < ActiveRecord::Base
  belongs_to :user
  belongs_to :request, dependent: :destroy
  
  def set_unaccepted
    accepted = false
    self.save
  end
end

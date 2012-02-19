class Submission < ActiveRecord::Base
  belongs_to :user
  belongs_to :request, dependent: :destroy
  after_create :set_unaccepted
  
  
  private
    def set_unaccepted
      self.accepted = false
      self.save
    end
end

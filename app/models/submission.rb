class Submission < ActiveRecord::Base
  LINK_REGEX = /(https:\/\/|http:\/\/|)github.com\/\w+\/\w+\/pull\/\d+/  #This regex matches github's pull request links as of Sat. Feb. 18th, 2012. We may need to do a date verification down the line. 
  
  validates :pull_request_link, presence: true
  validates :pull_request_link, format: {with: LINK_REGEX}

  belongs_to :user
  belongs_to :request, dependent: :destroy
  after_create :set_unaccepted
  
  
  private
    def set_unaccepted
      self.accepted = false
      self.save
    end
end

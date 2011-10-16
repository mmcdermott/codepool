class Project < ActiveRecord::Base
  has_many :donations 
  has_many :users, :through => :donations
  
  validates :title, :presence => true
  validates :original_issue, :presence => true
  validates :community, :presence => true
end

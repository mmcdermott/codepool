class Request < ActiveRecord::Base
  has_many :donations 
  has_many :users, :through => :donations
  
  validates :title, :presence => true
  validates :original_issue, :presence => true

  scope :active, :conditions => {:status => "open"}

  scoped_search :on => :community, :aliases => [:open_source_community, :origin]
  scoped_search :on => :title, :aliases => [:bug, :issue, :issue_title]
  scoped_search :on => :description, :aliases => [:details, :body]
  scoped_search :in => :users, :on => :name, :aliases => [:donor, :contributor, :pledge]

  acts_as_taggable
end

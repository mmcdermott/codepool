class Identity < OmniAuth::Identity::Models::ActiveRecord
  #attr_accessible :name, :email

  email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates_presence_of :name
  validates_uniqueness_of :email
  validates_format_of :email, :with => email_regex
  #validates_presence_of :company
end

class User < ActiveRecord::Base
  attr_accessible :name, :email, :company, :github_link, :website_link, :company_name, :contact_person_name, :description

  has_many :donations 
  has_many :authorizations
  has_many :requests, through: :donations
  has_many :submissions
  has_many :solutions, through: :submissions, source: :request
  
  def self.new_from_omniauth_hash(hash)
    user = User.new(email: hash[:info][:email], name: hash[:info][:name], company_name: hash[:extra][:raw_info][:company], contact_person_name: hash[:info][:name], description: hash[:extra][:raw_info][:bio], website_link: hash[:info][:urls][:blog], github_link: hash[:info][:urls][:GitHub])
    user.name ||= hash[:info][:nickname] # In github the name can be nil, so this sets it to the user name instead.
    if user.save
      return user
    else
      retun false
    end
  end

end

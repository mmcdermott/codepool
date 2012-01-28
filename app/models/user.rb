class User < ActiveRecord::Base
  attr_accessible :name, :email, :password, :password_confirmation, :description, :company

  has_many :donations 
  has_many :authorizations
  has_many :projects, :through => :donations
  
  def self.new_from_omniauth_hash(hash)
    user = User.new(:name => hash[:info][:name], :email => hash[:info][:email], :company => hash[:info][:company], :description => hash[:info][:description])
    user.name ||= hash[:info][:nickname] # In github the name can be nil, so this sets it to the user name instead.
    if user.save
      return user
    else
      retun false
    end
  end

end

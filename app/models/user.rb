class User < ActiveRecord::Base
  attr_accessible :name, :email, :company, :password, :password_confirmation

  has_many :donations 
  has_many :authorizations
  has_many :request, :through => :donations
  
  def self.new_from_omniauth_hash(hash)
    user = User.new(:email => hash[:info][:email], :name => hash[:info][:name], :company => hash[:info][:company])
    user.name ||= hash[:info][:nickname] # In github the name can be nil, so this sets it to the user name instead.
    if user.save
      return user
    else
      retun false
    end
  end

end

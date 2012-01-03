class User < ActiveRecord::Base
  attr_accessible :name, :email, :password, :password_confirmation, :description

  has_many :donations 
  has_many :authorizations
  has_many :projects, :through => :donations
  
  email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

#  validates :name,      :presence     => true
 # validates :email,     :presence     => true,
  #                      :format       => {:with => email_regex},
   #                     :uniqueness   => {:case_sensitive => false}
                        
#  validates :password, :presence     => true,
#                       :confirmation => true,
#                       :length       => { :within => 6..40 }

#  before_save :encrypt_password

  def self.new_from_omniauth_hash(hash)
    user = User.new(:name => hash[:info][:name], :email => hash[:info][:email])
    user.name ||= hash[:info][:nickname] # In github the name can be nil, so this sets it to the user name instead.
    if user.save
      return user
    else
      retun false
    end
  end

end

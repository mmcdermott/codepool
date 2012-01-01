module UsersHelper
  
  def user_pic(user)
    uid = user.authorizations.first.uid
    return "https://graph.facebook.com/#{uid}/picture"
  end
  
end

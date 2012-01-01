module SessionsHelper

def sign_out
  cookies.delete(:remember_token)
  self.current_user = nil
end

def current_user=(user)
  @current_user = user
  session[:user_id] = user.id
end

def current_user
   @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
end

def signed_in?
     !!current_user
end

  
end

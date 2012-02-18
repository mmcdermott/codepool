class SessionsController < ApplicationController
  def new
  end

  def create
    omnihash = request.env['omniauth.auth']
    
    unless @auth = Authorization.find_from_hash(omnihash)
      #store token if its new
      #create new user
      new_user = User.new_from_omniauth_hash(omnihash)
      @auth = Authorization.create_from_hash(omnihash, new_user)
      flash[:success] = "Welcome to Codepool!"
      return_path = edit_user_path(new_user.id)
     end
     user = User.find(@auth.user.id)
     return_path = (user.company.nil? ? edit_user_path(user.id) : user_path(user.id))
     
     # Log the authorizing user in.
     session[:user_id] = @auth.user.id
     redirect_to return_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Signed out!"
  end
end

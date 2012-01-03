class SessionsController < ApplicationController

  def create
    omnihash = request.env['omniauth.auth']
    
    unless @auth = Authorization.find_from_hash(omnihash)
      #store token if its new
      #create new user
      new_user = User.new_from_omniauth_hash(omnihash)
       @auth = Authorization.create_from_hash(omnihash, new_user)
       flash[:success] = "Welcome to Codepool!"
     end
     
     # Log the authorizing user in.
     session[:user_id] = @auth.user.id
     redirect_to user_path(@auth.user.id)
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Signed out!"
  end

end

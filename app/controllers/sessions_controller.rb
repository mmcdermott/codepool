class SessionsController < ApplicationController

def new
  @user = User.new
end

def create
  user = User.authenticate params[:session][:email], params[:session][:password]
  
  unless user.nil?
    flash[:success] = "LogIn successfull"
    sign_in user
    redirect_to user
  else
    flash.now[:error] = "Email/Password combination don't match"
    render 'new'
  end
end

def destroy
end

end

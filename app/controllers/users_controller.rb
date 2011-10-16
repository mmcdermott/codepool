class UsersController < ApplicationController
  # GET /users
  # GET /users.json
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  def submit_pledge
    @user = User.find(params[:id]);
    email = @user.email
    token = @user.stripe_token

    if (token.nil? || token.empty?) 
      if (params[:token])
        customer = Stripe::Customer.create(
          :card => params[:token],
          :description => email
        )
        token = @user.stripe_token = customer.id
        @user.save
      end
    end

  @token = token
# charge the Customer instead of the card
#Stripe::Charge.create(
#    :amount => 1000, # in cents
#    :currency => "usd",
#    :customer => customer.id
#)


    respond_to do |format|
      format.html 
    end
  end

  # POST /users
  # POST /users.json
  def create
    password = params[:user][:password]
    confirm = params[:user][:password_confirmation]
    if password != confirm && !password.empty?
      flash.now[:error] = "password does not match confirmation"
      render "new"
    end
    new_hash = {:name => params[:user][:name], :password => password, :email => params[:user][:email]}
    @user = User.new(new_hash)
    
    respond_to do |format|
      if @user.save
        sign_in(@user)
        format.html { redirect_to @user, success: 'Welcome to CodePool!' }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: "#{params[:user]}" }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :ok }
    end
  end
end

class UsersController < ApplicationController
  before_filter :authenticate, :only => [:edit, :update, :submit_pledge]

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

  def submit
    @project = Project.find(params[:id])
    @project.donations.each do |donation|
      unless donation.nil
        user = donation.user
        Stripe::Charge.create(
          :amount => donation.amount, # in cents
          :currency => "usd",
          :customer => user.stripe_token
        )
      end
    end
    @project.status = "finished"
    @project.price = 0
    @project.save
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

    @project = Project.find(params[:pid])

    if (token)  
      amount = params[:pledge_amount]
      @donation = Donation.new({:project_id => params[:pid], :user_id => params[:id], :amount => amount})
      if @donation.save
        project = @project
        project.price += @donation.amount
        project.save
      end
    end

    respond_to do |format|
      format.html
    end
  end

  def send_activation
    @mail = Mailer.activation(current_user).deliver
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
    password =
    new_hash = {:name => params[:user][:name], :password => password, :email => params[:user][:email]}
    @user = User.new(new_hash)
    @user.encrypt_password
    respond_to do |format|
      if @user.save
        sign_in(@user)
        @mail = Mailer.activation(current_user).deliver
        format.html { redirect_to '/' }
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
    password = params[:user][:password]
    confirm = params[:user][:password_confirmation]
    if password != confirm || !(password.empty? || password.nil?)
      flash.now[:error] = "password does not match confirmation"
      render "new"
    end
    new_hash = {:name => params[:user][:name], :password => password, :email => params[:user][:email]}

    respond_to do |format|
      if @user.update_attributes(new_hash)
        format.html { redirect_to @user, notice: "#{params[:user]}" }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def pre_submit
    @user = current_user
    @project = Project.find(params[:user][:pid])
    @user.paypal = params[:user][:paypal]
    @user.address = params[:user][:address]
    if @user.save && !(@user.nil? or @project.nil?)
      Mailer.submission_confirmation(@user,@project).deliver
      redirect_to thank_you_path
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

  private

    def authenticate
      deny_access unless signed_in?
    end
end

class UsersController < ApplicationController
  before_filter :authenticate, :only => [:edit, :update, :submit_pledge, :index]
  before_filter :admin, :only => [:index, :destroy]

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
  end

  def submit
    @request = Request.find(params[:id])
    @request.donations.each do |donation|
      unless donation.nil
        user = donation.user
        Stripe::Charge.create(
          :amount => donation.amount, # in cents
          :currency => "usd",
          :customer => user.stripe_token
        )
      end
    end
    @request.status = "finished"
    @request.price = 0
    @request.save
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end
  
  def new_info
     @user = User.find(params[:user_id])
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

    @request = Request.find(params[:pid])

    if (token)  
      amount = params[:pledge_amount].to_f
      @donation = Donation.new({:request_id => params[:pid], :user_id => params[:id], :amount => amount})
      if @donation.save
        request = @request
        request.price += @donation.amount
        if request.save
          flash[:success] = "Request price updated to #{request.price}"
        end
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
    @user = User.new
  
    respond_to do |format|
      if @user.save
        sign_in_and_redirect_to(@user, edit_user_path(@user))
        flash[:notice] = "Welcome to Codepool!"
        @mail = Mailer.activation(current_user).deliver
        format.html { redirect_to @user }
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
  
  def pre_submit
    @user = current_user
    @request = Request.find(params[:user][:pid])
    paypal = params[:user][:paypal]
    @user.paypal = paypal
    address = params[:user][:address]
    @user.address = address
    if paypal == 0 && (address.empty? || address.nil?)
      flash[:error] = "You must select a payment style"
      redirect_to 'pre_submit'
    end
    if @user.save && !(@user.nil? or @request.nil?)
      Mailer.submission_confirmation(@user,@request).deliver
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
    def admin_email?(email)
      ['Ozzie_Gooen@hmc.edu','mattmcdermott8@gmail.com'].include? email
    end
    
    def admin
      deny_access unless current_user.admin?
    end

    def authenticate
      deny_access unless signed_in?
    end
end

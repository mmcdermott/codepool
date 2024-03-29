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
    @donations = @user.donations
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

    if @user.id != params[:id].to_i
      flash[:error] = "User does not match. Pledge could not be saved"
    else
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

      if params[:confirm]
        @request = Request.find(params[:pid])

        if (token)
          amount = params[:pledge_amount].to_f
          @donation = Donation.new({:request_id => params[:pid], :user_id => params[:id], :amount => amount})
          if @donation.save
            @request.price += @donation.amount
            if @request.save
              flash[:success] = "Request updated to $#{sprintf '%0.f', @request.price}!"
            end
          end
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
    @request = Request.find(params[:pid])
    issue_link = params[:issue_link]
    githubLinkRegex = /(https:\/\/|http:\/\/|)github.com\/\w+\/\w+\/pull\/\d+/  #This regex matches github's pull request links as of Sat. Feb. 18th, 2012. We may need to do a date verification down the line. 
    if issue_link.nil? || issue_link.empty?
      flash[:error] = "You must submit your closing pull request link"
      redirect_to pre_submit_request_path(@request)
    elsif !githubLinkRegex.match(issue_link)
      flash[:error] = "Your link is not a github pull request link!"
      redirect_to pre_submit_request_path(@request)
    elsif !(@user.nil? or @request.nil?)
      Mailer.submission_confirmation(@user,@request, issue_link).deliver
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

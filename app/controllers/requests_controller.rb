class RequestsController < ApplicationController
  before_filter :authenticate, :only => [:new, :pre_submit, :destroy]
  before_filter :admin_user, :only => [:destroy, :close]
  autocomplete :tag, :name, :class_name => 'ActsAsTaggableOn::Tag' # <- New

  # GET /requests
  # GET /requests.json
  def index
    search_query = params[:search]
    @requests = Request.active.funded.request_order(params[:order])
#   @requests = Request.active.search_for(search_query).paginate(:page => params[:page], :per_page => 20)
    @requests = @requests.search_for(search_query).paginate(:page => params[:page], :per_page => 15)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @requests }
    end
  end

  # GET /requests/1
  # GET /requests/1.json
  def show
    @request = Request.find(params[:id])
    @current_user = current_user
    @donation = Donation.new
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @request }
    end
  end
  
  def pre_submit
    @request = Request.find(params[:id])
    @user = current_user
  end

  def close
    @request = Request.find(params[:id])
    if @request.status == "closed"
      flash[:notice] = "Request already closed"
    else
      @request.donations.each do |donation|
        charge_user donation.user, donation.amount, @request.title
      end
      @request.status = "closed"
      @request.price = 0
      if @request.save
        flash[:success] = "Request closed"
      else 
        flash[:error] = "Request status and price not updated (though users charged)!"
      end
    end
    redirect_to requests_path
  end
  
  # GET /requests/new
  # GET /requests/new.json
  def new
    @request = Request.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @request }
    end
  end

  # POST /requests
  # POST /requests.json
  def create
    @request = Request.new(params[:request])
    @request.status = 'open'
    @request.price = 0;
    respond_to do |format|
      if @request.save
        @request.link = "#{root_url}requests/#{@request.id}"
        @request.save
        format.html { redirect_to @request, success: 'Request was created!' }
        format.json { render json: @request, status: :created, location: @request }
      else
        format.html { render action: "new" }
        format.json { render json: @request.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /requests/1
  # PUT /requests/1.json
  def update
    @request = Request.find(params[:id])

    respond_to do |format|
      if @request.update_attributes(params[:request])
        format.html { redirect_to @request, notice: 'Request was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @request.errors, status: :unprocessable_entity }
      end
    end
  end

  def tag_cloud
    @tags = Request.tag_counts_on(:tags)
  end

  def tag
    @requests = Request.tagged_with(params[:tag])
    respond_to do |format|
      format.html
      format.json { render json: @requests }
    end
  end

  # DELETE /requests/1
  # DELETE /requests/1.json
  def destroy
    @request = Request.find(params[:id])
    @request.destroy

    respond_to do |format|
      format.html { redirect_to requests_url }
      format.json { head :ok }
    end
  end

  private 
  
    def charge_user user, amount, request_title
      Stripe::Charge.create(
        :amount => amount*100,  #Amount is in dollars, stripe wants it in cents. 
        :currency => 'usd',
        :customer => user.stripe_token,
        :description => "Charge for User's donation to #{request_title}")
    end

    def admin_user
      deny_access unless current_user.admin
    end

    def authenticate
      deny_access unless signed_in?
    end
end

class ProjectsController < ApplicationController
  before_filter :authenticate, :only => [:new, :pre_submit, :destroy]
  before_filter :admin_user, :only => [:destroy, :close]
  autocomplete :tag, :name, :class_name => 'ActsAsTaggableOn::Tag' # <- New

  # GET /projects
  # GET /projects.json
  def index
    search_query = params[:search]
#    @projects = Project.active.search_for(search_query).paginate(:page => params[:page], :per_page => 20)
    @projects = Project.active.search_for(search_query).paginate(:page => params[:page], :per_page => 20)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @projects }
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @project = Project.find(params[:id])
    @current_user = current_user
    @donation = Donation.new
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @project }
    end
  end
  
  def pre_submit
    @project = Project.find(params[:id])
    @user = current_user
  end

  def close
    @project = Project.find(params[:id])
    if @project.status == "closed"
      flash[:notice] = "Project already closed"
    else
      @project.donations.each do |donation|
        charge_user donation.user, donation.amount, @project.title
      end
      @project.status = "closed"
      @project.price = 0
      if @project.save
        flash[:success] = "Project closed"
      else 
        flash[:error] = "Project status and price not updated (though users charged)!"
      end
    end
    redirect_to projects_path
  end
  
  # GET /projects/new
  # GET /projects/new.json
  def new
    @project = Project.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @project }
    end
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(params[:project])
    @project.status = 'open'
    respond_to do |format|
      if @project.save
        @project.link = "#{root_url}projects/#{@project.id}"
        @project.save
        format.html { redirect_to @project, success: 'Request was created!' }
        format.json { render json: @project, status: :created, location: @project }
      else
        format.html { render action: "new" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /projects/1
  # PUT /projects/1.json
  def update
    @project = Project.find(params[:id])

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  def tag_cloud
    @tags = Project.tag_counts_on(:tags)
  end

  def tag
    @projects = Project.tagged_with(params[:tag])
    respond_to do |format|
      format.html
      format.json { render json: @projects }
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to projects_url }
      format.json { head :ok }
    end
  end

  private
  
    def charge_user user, amount, project_title
      Stripe::Charge.create(
        :amount => amount*100,  #Amount is in dollars, stripe wants it in cents. 
        :currency => 'usd',
        :customer => user.stripe_token,
        :description => "Charge for User's donation to #{project_title}")
    end

    def admin_user
      deny_access unless current_user.admin
    end

    def authenticate
      deny_access unless signed_in?
    end
end

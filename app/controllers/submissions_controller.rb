class SubmissionsController < ApplicationController
  def new
    @request = Request.find(params[:request_id])
    @user = current_user
    @submission = @request.submissions.new(user_id: @user.id)
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @request }
    end
  end
  
  def create
    @request = Request.find(params[:request_id])
    @user = current_user
    @submission = @request.submissions.create(params[:submission])
    if @submission.save
      Mailer.submission_confirmation(@user,@request, @submission.pull_request_link).deliver
      flash[:success] = "Submission Recorded"
      redirect_to thank_you_path
    else
      render action: "new"
    end
  end

end

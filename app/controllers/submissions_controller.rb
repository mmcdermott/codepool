class SubmissionsController < ApplicationController
  def new
    @request = Request.find(params[:request_id])
    @user = current_user
    @submission = @request.submissions.new(user_id: @user.id)
  end
  
  def create
    @request = Request.find(params[:request_id])
    @user = current_user
    if @submission = @request.submissions.create(params[:submission])
      @submission.set_unaccepted
      flash[:success] = "Submission Recorded"
      redirect_to thank_you_path
    else
      redirect_to new_request_submission_path(@request)
    end
  end

end

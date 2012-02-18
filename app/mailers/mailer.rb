class Mailer < ActionMailer::Base
  default from: "codepool <do-not-reply@codepool.org>"

  def activation(user)
    @account = user
    mail(
      :to  => user.formatted_email,
    );
  end

  def submission_confirmation(user,request,issueLink)
    @user = user
    @request = request
    @issueLink = issueLink
    mail(
      to:       "codepoolorg@gmail.com",
      subject:  "Someone Closed A Request",
    );
  end
end

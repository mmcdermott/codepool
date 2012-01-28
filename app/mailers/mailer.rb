class Mailer < ActionMailer::Base
  default from: "codepool <do-not-reply@codepool.org>"

  def activation(user)
    @account = user
    mail(
      :to  => user.formatted_email,
    );
  end

  def submission_confirmation(user,request)
    @user = user
    @request = request
    mail(
      :to  => "codepoolorg@gmail.com",
    );
  end
end

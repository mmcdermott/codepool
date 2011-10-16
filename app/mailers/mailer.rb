class Mailer < ActionMailer::Base
  default from: "codepool <do-not-reply@codepool.org>"

  def activation(user)
    @account = user
    mail(
      :to  => user.formatted_email,
    );
  end

  def submission_confirmation(user,project)
    @user = user
    @project = project
    mail(
      :to  => "codepoolorg@gmail.com",
    );
  end
end

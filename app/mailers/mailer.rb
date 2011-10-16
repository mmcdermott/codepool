class Mailer < ActionMailer::Base
  default from: "do-not-reply@codepool.org"

  def activation(user)
    @account = user
    mail(
      :to  => user.formatted_email,
    );
  end
end

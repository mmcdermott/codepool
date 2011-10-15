class Mailer < ActionMailer::Base
  default from: "do-not-reply@codepool.org"

  def activation(recipient)
    @account = recipient
    mail(
      :to  => recipient.email_address_with_name,
    );
  end
end

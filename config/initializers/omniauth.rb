if Rails.env == 'development' || Rails.env == 'test'
  Rails.application.config.middleware.use OmniAuth::Builder do
    provider :facebook, "203758613046153", "2d14bb7b20eb82ce5c88367425548509"
    provider :github, "fad67e5fac6e5319d682", "3989529c99779b5c94a35bd41a5a91334d51ba06"
    provider :identity, fields: [:email,:name,:company], on_failed_registration: lambda { |env|    
    IdentitiesController.action(:new).call(env) }
  end
else
  # Production
  Rails.application.config.middleware.use OmniAuth::Builder do
    provider :facebook, "309363909097151", "dbac439fc9ab2cbbcb71069bcf99bde4"
  end
end


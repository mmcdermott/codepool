source 'http://rubygems.org'

gem 'rails', '3.1.1'
gem 'acts-as-taggable-on', '~>2.1.0'
gem 'heroku'

#omniauth gems (one for each provider)
gem 'omniauth-facebook'
gem 'omniauth-github', :git => 'git://github.com/intridea/omniauth-github.git'
gem 'omniauth-identity'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

group :production do
	gem 'pg'
	gem 'therubyracer-heroku', '0.8.1.pre3'
end
group :development, :test do
  gem 'test-unit'
	gem 'sqlite3'
	gem 'pry'
	
end

gem 'rails3-jquery-autocomplete'
gem 'actionmailer'
gem 'stripe'

# Pagination
gem 'will_paginate', '3.0.0'

# Searching
gem 'scoped_search'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

# To use ActiveModel has_secure_password (and omniauth-identity too)
gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  # Pretty printed test output
  gem 'turn', :require => false
end

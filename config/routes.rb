Codepool::Application.routes.draw do
  resources :tags

  resources :users do
    get 'new_info'
  end

  match	'home',   :to => 'pages#home'
  match	'home2',  :to => 'pages#home2'
  match	'landing',:to => 'pages#landing'
  match	'thanks', :to => 'pages#thanks'
  
#  resources :requests, :only => [:index, :new, :create, :destroy, :show, :pre_submit, :tag, :autocomplete_tag_name]
  resources :requests do
    get :autocomplete_tag_name, :on => :collection
    member do
      get 'pre_submit'
      get 'close'
    end
  end
  resources :sessions, :only => [:new, :create, :destroy]
  resources :identities, :only => [:new, :create, :destroy]
  
  match '/submission', :to => 'users#pre_submit'

  match '/sign_up',  :to => 'users#new'
  match '/sign_in',  :to => 'sessions#new'
  match '/sign_out', :to => 'sessions#destroy'
  match '/submit_pledge', :to => 'users#submit_pledge'
  match '/mail/send_activation', :to => 'users#send_activation'
  match '/about',   :to => 'pages#about'
  match '/faq',     :to => 'pages#faq'
  match '/contact', :to => 'pages#contact'
  match '/thank_you', :to => 'pages#thank_you'

  match '/new_individual', :to => 'users#new_individual'
  
  match '/auth/:provider/callback', :to => 'sessions#create'
  match "/signout" => "sessions#destroy", :as => :signout
  match '/new_info' => 'users#new_info'
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
  
  root :to => 'requests#index'
end

Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post 'auth/signup', to: 'auth/registrations#create'
        post 'auth/login', to: 'auth/sessions#create'
        delete 'auth/logout', to: 'auth/sessions#destroy'
        post 'auth/password-reset', to: 'auth/passwords#create'
        put 'auth/password-reset', to: 'auth/passwords#update'
        get 'auth/verify-email', to: 'auth/email_verifications#show'
      end

      get 'users/me', to: 'users#me'
      put 'users/me', to: 'users#update'
      delete 'users/me', to: 'users#destroy'
    end
  end
end

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
      }

      namespace :auth do
        resources :sessions, only: :index
      end

      resources :users

      resources :stamp_downloads, only: :create

      resources :stamp_downloads, only: :index do
        collection do
          get 'users/:id', to: 'stamp_downloads#user_index'
        end
      end

      get '/stamps/preview', to: 'stamps#preview'
      get '/stamps/metadata', to: 'stamps#metadata'
    end
  end
end

Rails.application.routes.draw do
  root 'pages#index'
  namespace "api" do
    namespace "v1" do
      resources :users do
        resources :notes
      end
    end
  end
end

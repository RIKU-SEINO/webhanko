class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_user
      render json: {
        is_login: true,
        user: current_user,
      }
    else
      render json: {
        is_login: false,
        message: 'No user logged in',
      }
    end
  end

  def sign_in_params
    params.permit(:email, :password)
  end
end

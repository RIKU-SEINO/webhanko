class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: {
        is_login: true,
        user: current_api_v1_user,
      }, status: :ok
    else
      render json: {
        is_login: false,
        message: 'ユーザーが存在しません',
      }, status: :unauthorized
    end
  end

  def sign_in_params
    params.permit(:email, :password)
  end
end

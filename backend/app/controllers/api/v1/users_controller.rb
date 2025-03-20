class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]
  before_action :check_advanced_access, only: %i[show update destroy]

  # Uncomment the following lines if you want to implement admin feature
  # def index
  #   if current_user&.admin?
  #     users = User.all
  #     render json: { users: users, errors: nil }, status: :ok
  #   else
  #     render json: { errors: ['この機能を利用するためには管理者権限が必要です'] }, status: :unauthorized
  #   end
  # end

  def show
    render json: { user: @user, errors: nil }, status: :ok
  end

  def update
    if @user.update(user_params)
      render json: { user: @user, errors: nil }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      render json: { message: 'User deleted successfully', errors: nil }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(
      :email,
      :password,
      :password_confirmation,
    )
  end

  def set_user
    @user = current_user
  end

  def check_advanced_access
    render json: { errors: ['この機能を利用するためにはログインが必要です'] }, status: :unauthorized if @user.nil?
  end
end

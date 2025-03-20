class Api::V1::StampDownloadsController < ApplicationController
  before_action :set_stamp_download, only: %i[create]
  before_action :set_user, only: %i[index create destroy]
  before_action :check_advanced_access, only: %i[create]

  def index
    stamp_downloads = @user.stamp_downloads
    render json: { stamp_downloads: stamp_downloads }, status: :ok
  end

  def create
    @stamp_download.user = @user

    validate_stamp_download

    if @stamp_download.save
      render json: { errors: nil }, status: :created
    else
      render json: { errors: @stamp_download.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    stamp_download = @user.stamp_downloads.find(params[:id])
    if stamp_download.destroy
      render json: { errors: nil }, status: :ok
    else
      render json: { errors: stamp_download.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def stamp_download_params
    params.permit(
      :stamp_category,
      :stamp_type,
      :engraving_type,
      :font,
      :text_1,
      :text_2,
      :text_3,
      :balance,
      :is_advanced
    ).tap do |p|
      p[:is_advanced] = p[:is_advanced] == 'true'
    end
  end

  def set_stamp_download
    @stamp_download ||= StampDownload.new
    @stamp_download.assign_attributes(stamp_download_params)
  end

  def set_user
    @user = current_user
  end

  def validate_stamp_download
    return render json: { errors: @stamp_download.errors.full_messages }, status: :unprocessable_entity if @stamp_download.invalid?
  end

  def check_advanced_access
    render json: { errors: ['この機能を利用するためにはログインが必要です'] } if @stamp_download.advanced? && @user.nil?
  end
end

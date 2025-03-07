class Api::V1::StampDownloadsController < ApplicationController
  before_action :check_advanced_access, only: %i[create]

  def create
    stamp_download = StampDownload.new(stamp_download_params)
    stamp_download.user = current_user

    if stamp_download.valid?
      if stamp_download.save
        render json: { errors: nil }, status: :created
      else
        render json: { errors: stamp_download.errors.full_messages }, status: :unprocessable_entity
      end
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

  def stamp_download
    @stamp_download ||= StampDownload.new
    @stamp_download.assign_attributes(stamp_download_params)
    @stamp_download
  end

  def check_advanced_access
    render json: { errors: ['You are not signed in'] }, status: :unauthorized if stamp_download.advanced? && !current_user
  end
end

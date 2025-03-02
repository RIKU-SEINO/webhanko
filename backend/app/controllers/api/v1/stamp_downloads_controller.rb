class Api::V1::StampDownloadsController < ApplicationController
  def create
    stamp_download = StampDownload.new(stamp_download_params)

    if stamp_download.save
      render json: {
        errors: nil,
      }, status: :created
    else
      render json: {
        errors: stamp_download.errors.full_messages,
      }, status: :unprocessable_entity
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
end

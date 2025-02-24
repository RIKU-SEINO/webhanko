class Api::V1::StampsController < ApplicationController
  def preview
    stamp = Stamp.new(stamp_params)

    if stamp.invalid?
      render json: { errors: stamp.errors.full_messages }, status: :unprocessable_entity
      return
    end

    image = if stamp.advanced?
              stamp.build_image_advanced
            else
              stamp.build_image
            end

    send_data image.to_blob, type: 'image/png', disposition: 'inline'
  end

  private

  def stamp_params
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
    ).tap do |params|
      params[:is_advanced] = params[:is_advanced] == 'true'
    end
  end
end

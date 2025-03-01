class Api::V1::StampsController < ApplicationController
  before_action :build_stamp, only: %i[preview metadata]
  before_action :validate_stamp, only: %i[preview metadata]

  def preview
    image = build_stamp_image(stamp)
    send_data image.to_blob, type: 'image/png', disposition: 'inline'
  end

  def metadata
    render json: stamp.metadata
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
    ).tap do |p|
      p[:is_advanced] = p[:is_advanced] == 'true'
    end
  end

  def stamp
    stamp = @stamp || Stamp.new
    stamp.assign_attributes(stamp_params)
    stamp
  end

  def build_stamp
    @stamp = Stamp.new(stamp_params)
  end

  def validate_stamp
    return render json: { errors: stamp.errors.full_messages }, status: :unprocessable_entity if stamp.invalid?
  end

  def build_stamp_image(stamp)
    stamp.advanced? ? stamp.build_image_advanced : stamp.build_image
  end
end

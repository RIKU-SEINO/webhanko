class Api::V1::StampsController < ApplicationController
  before_action :load_stamp_options, only: :translate

  def preview
    stamp = Stamp.new(stamp_params)

    return render json: { errors: stamp.errors.full_messages }, status: :unprocessable_entity if stamp.invalid?

    image = build_stamp_image(stamp)

    send_data image.to_blob, type: 'image/png', disposition: 'inline'
  end

  def translate
    render json: {
      stamp_category: translate_stamp_option(:stamp_category, stamp_params[:stamp_category]),
      stamp_type: translate_stamp_option(:stamp_type, stamp_params[:stamp_category], stamp_params[:stamp_type]),
      engraving_type: translate_stamp_option(:engraving_type, stamp_params[:stamp_category], stamp_params[:stamp_type], stamp_params[:engraving_type]),
      font: translate_stamp_option(:font, stamp_params[:stamp_category], stamp_params[:stamp_type], stamp_params[:font]),
      balance: translate_stamp_option(:balance, stamp_params[:balance]),
    }
  end

  private

  def load_stamp_options
    @stamp_options = Rails.application.config.stamp_options
  end

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

  def build_stamp_image(stamp)
    stamp.advanced? ? stamp.build_image_advanced : stamp.build_image
  end

  def translate_stamp_option(option, *keys)
    @stamp_options.dig(option, *keys.map(&:to_sym))
  end
end

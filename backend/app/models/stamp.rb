require 'mini_magick'

class Stamp
  include ActiveModel::API
  include ActiveModel::Attributes

  INKANHONPO_BASE_URL = 'https://www.inkan-honpo.com/stampImage.cgi?'.freeze
  STAMP_SIZE = 500.freeze
  DOT = 1.freeze
  ROTATE_CHAR = '%81[%81\%81|%81]-%81F:%81^/%81`'.freeze
  ASPECT_RATIO = 1.freeze
  CENTER_HEIGHT = 0.36.freeze
  DATE_SAMPLE_HEIGHT = 0.12.freeze
  DATE_SAMPLE_WIDTH = 0.62.freeze
  LINE_LAYOUT = 'center'.freeze
  RADIUS = 8.freeze

  attribute :stamp_category, :string
  attribute :stamp_type, :string
  attribute :engraving_type, :string
  attribute :font, :string
  attribute :text_1, :string
  attribute :text_2, :string
  attribute :text_3, :string
  attribute :is_advanced, :boolean
  attribute :balance, :string

  validates :stamp_category, :stamp_type, :engraving_type, :font, :balance, presence: true
  validates :is_advanced, inclusion: { in: [true, false] }

  def advanced?
    is_advanced
  end

  def build_image
    image_url = build_image_url

    MiniMagick::Image.open(image_url)
  end

  def build_image_advanced
    image_url = build_image_url
    image = MiniMagick::Image.open(image_url)

    remove_white_background(image)
  end

  def metadata
    titles = resolve_stamp_option_value(:engraving_text_title, stamp_category.to_sym, stamp_type.to_sym, engraving_type.to_sym)
    text = {}
    titles.each_with_index do |title, i|
      text[title] = send("text_#{i + 1}")
    end

    {
      stamp_category: resolve_stamp_option_hash(:stamp_category, stamp_category.to_sym),
      stamp_type: resolve_stamp_option_hash(:stamp_type, stamp_category.to_sym, stamp_type.to_sym),
      engraving_type: resolve_stamp_option_hash(:engraving_type, stamp_category.to_sym, stamp_type.to_sym, engraving_type.to_sym),
      font: resolve_stamp_option_hash(:font, stamp_category.to_sym, stamp_type.to_sym, font.to_sym),
      text: text,
      is_advanced: is_advanced,
      balance: resolve_stamp_option_hash(:balance, balance.to_sym),
      engraving_type_candidates: resolve_stamp_option_value(:engraving_type, stamp_category.to_sym, stamp_type.to_sym),
      font_candidates: resolve_stamp_option_value(:font, stamp_category.to_sym, stamp_type.to_sym),
      balance_candidates: resolve_stamp_option_value(:balance),
    }
  end

  private

  def build_image_url
    base_url = INKANHONPO_BASE_URL
    query = build_query

    "#{base_url}#{query.to_query}"
  end

  def build_query
    query = {
      command: fetch_query(:command),
      type: fetch_query(:type),
      columnSize: fetch_query(:column_size),
      vector: fetch_query(:vector),
      font: fetch_query(:font),
      frameWidth: fetch_query(:frame_width),
      balance: fetch_query(:balance),
      margin: fetch_query(:margin),
      stampSize: STAMP_SIZE,
      dot: DOT,
      rotateChar: ROTATE_CHAR,
      aspectRatio: ASPECT_RATIO,
      centerHeight: CENTER_HEIGHT,
      dateSampleHeight: DATE_SAMPLE_HEIGHT,
      dateSampleWidth: DATE_SAMPLE_WIDTH,
      line1Layout: LINE_LAYOUT,
      line2Layout: LINE_LAYOUT,
      line3Layout: LINE_LAYOUT,
      line4Layout: LINE_LAYOUT,
      radius: RADIUS,
    }

    text_keys = fetch_query(:text_keys)

    if text_keys.present?
      text_values = [text_1, text_2, text_3]
      text_keys.each_with_index do |key, i|
        text_value = text_values[i]
        text_value = text_value.encode('Shift_JIS') if text_value.present? && key != :dateSample
        query = query.merge({ key => text_value })
      end
    end

    query
  end

  def stamp_options
    Rails.application.config.stamp_options
  end

  def resolve_stamp_option_hash(*keys)
    value = stamp_options.dig(*keys)
    return {} unless value.present?

    { keys.last => value }
  end

  def resolve_stamp_option_value(*keys)
    value = stamp_options.dig(*keys)
    return {} unless value.present?

    value
  end

  def stamp_queries
    Rails.application.config.stamp_queries
  end

  def fetch_query(property)
    case property
    when :balance
      stamp_queries.dig(property, balance.to_sym)
    when :font
      stamp_queries.dig(property, stamp_category.to_sym, stamp_type.to_sym, font.to_sym)
    else
      stamp_queries.dig(property, stamp_category.to_sym, stamp_type.to_sym, engraving_type.to_sym)
    end
  end

  def remove_white_background(image)
    image.combine_options do |c|
      c.fuzz '40%'
      c.transparent 'white'
    end
  end
end

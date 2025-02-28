require 'rails_helper'

RSpec.describe "Stamps", type: :request do
  describe "GET /api/v1/stamps/preview" do
    context 'not advanced stamp' do
      let(:stamp) { FactoryBot.build(:stamp) }

      it 'returns PNG image' do
        get api_v1_stamps_preview_path(stamp.attributes)

        aggregate_failures do
          expect(response).to have_http_status(:ok)
          expect(response.content_type).to eq('image/png')
        end
      end
    end

    context 'advanced stamp' do
      let(:stamp) { FactoryBot.build(:stamp, :advanced) }

      it 'returns PNG image' do
        get api_v1_stamps_preview_path(stamp.attributes)

        aggregate_failures do
          expect(response).to have_http_status(:ok)
          expect(response.content_type).to eq('image/png')
        end
      end
    end

    context 'invalid stamp' do
      let(:stamp) { FactoryBot.build(:stamp) }

      it 'returns unprocessable entity' do
        stamp.stamp_category = nil
        get api_v1_stamps_preview_path(stamp.attributes)

        aggregate_failures do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end
      end
    end
  end

  describe "GET /api/v1/stamps/translate" do
    let(:stamp_options) { Rails.application.config.stamp_options }
    let(:stamp) { FactoryBot.build(:stamp) }

    it 'returns translated stamp options' do
      get api_v1_stamps_translate_path(stamp.attributes)

      json = JSON.parse(response.body)

      stamp_category = stamp_options.dig(:stamp_category, stamp.stamp_category.to_sym)
      stamp_type = stamp_options.dig(:stamp_type, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym)
      engraving_type = stamp_options.dig(:engraving_type, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym, stamp.engraving_type.to_sym)
      font = stamp_options.dig(:font, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym, stamp.font.to_sym)
      balance = stamp_options.dig(:balance, stamp.balance.to_sym)

      aggregate_failures do
        expect(response).to have_http_status(:ok)
        expect(json['stamp_category']).to eq(stamp_category)
        expect(json['stamp_type']).to eq(stamp_type)
        expect(json['engraving_type']).to eq(engraving_type)
        expect(json['font']).to eq(font)
        expect(json['balance']).to eq(balance)
      end
    end
  end
end

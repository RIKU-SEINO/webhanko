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
end

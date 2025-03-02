require 'rails_helper'

RSpec.describe "StampDownloads", type: :request do
  describe "POST /api/v1/stamp_downloads" do
    let(:stamp_download) { FactoryBot.build(:stamp_download)}

    context 'valid stamp' do
      it 'creates a stamp_download' do
        post api_v1_stamp_downloads_path(stamp_download.attributes)

        body = JSON.parse(response.body)

        aggregate_failures do
          expect(response).to have_http_status(:created)
          expect(body['errors']).to be_nil
        end
      end
    end

    context 'invalid stamp' do
      it 'returns unprocessable entity' do
        stamp_download.stamp_category = nil
        post api_v1_stamp_downloads_path(stamp_download.attributes)

        body = JSON.parse(response.body)

        aggregate_failures do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(body['errors']).to_not be_nil
        end
      end
    end
  end
end

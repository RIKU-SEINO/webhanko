require 'rails_helper'

RSpec.describe "StampDownloads", type: :request do
  describe "POST /api/v1/stamp_downloads" do
    context 'not advanced stamp download' do
      let(:stamp_download) { FactoryBot.build(:stamp_download)}

      it 'creates a stamp_download' do
        post api_v1_stamp_downloads_path(stamp_download.attributes)

        body = JSON.parse(response.body)

        aggregate_failures do
          expect(response).to have_http_status(:created)
          expect(body['errors']).to be_nil
        end
      end
    end

    context 'advanced stamp download' do
      let(:stamp_download) { FactoryBot.build(:stamp_download, :advanced) }

      context 'not signed in' do
        before do
          allow_any_instance_of(Api::V1::StampDownloadsController).to receive(:current_user).and_return(nil)
        end

        it 'returns unauthorized' do
          post api_v1_stamp_downloads_path(stamp_download.attributes)

          body = JSON.parse(response.body)

          aggregate_failures do
            expect(response).to have_http_status(:unauthorized)
            expect(body['errors']).to_not be_nil
          end
        end
      end

      context 'signed in' do
        let(:user) { FactoryBot.create(:user) }

        before do
          allow_any_instance_of(Api::V1::StampDownloadsController).to receive(:current_user).and_return(user)
        end

        it 'creates a stamp_download' do
          post api_v1_stamp_downloads_path(stamp_download.attributes)

          body = JSON.parse(response.body)

          aggregate_failures do
            expect(response).to have_http_status(:created)
            expect(body['errors']).to be_nil
          end
        end
      end
    end

    context 'invalid stamp' do
      let(:stamp_download) { FactoryBot.build(:stamp_download) }
      
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

require 'rails_helper'

RSpec.describe StampDownload, type: :model do

  describe 'validations' do
    let(:stamp_download) { FactoryBot.build(:stamp_download) }

    it 'is valid with valid attributes' do
      expect(stamp_download).to be_valid
    end

    it 'increase the number of stamp_downloads by 1' do
      expect { stamp_download.save }.to change { StampDownload.count }.by(1)
    end

    it 'is not valid without a stamp_category' do
      stamp_download.stamp_category = nil
      expect(stamp_download).to_not be_valid
    end

    it 'is not valid without a stamp_type' do
      stamp_download.stamp_type = nil
      expect(stamp_download).to_not be_valid
    end

    it 'is not valid without an engraving_type' do
      stamp_download.engraving_type = nil
      expect(stamp_download).to_not be_valid
    end

    it 'is not valid without a font' do
      stamp_download.font = nil
      expect(stamp_download).to_not be_valid
    end

    it 'is not valid without a balance' do
      stamp_download.balance = nil
      expect(stamp_download).to_not be_valid
    end

    it 'is valid without text' do
      stamp_download.text_1 = nil
      expect(stamp_download).to be_valid
    end

    it 'is not valid when is_advanced is not included in [true, false]' do
      stamp_download.is_advanced = nil
      expect(stamp_download).to_not be_valid
    end

    it 'does not icrease the number of stamp_downloads when stamp_download is invalid' do
      stamp_download.stamp_category = nil
      expect { stamp_download.save }.to_not change { StampDownload.count }
    end
  end

  describe 'associations' do
    it 'belongs to user' do
      stamp_download = FactoryBot.create(:stamp_download)
      expect(stamp_download.user).to be_a(User)
    end

    it 'is valid without a user' do
      stamp_download = FactoryBot.create(:stamp_download, :with_no_user)
      expect(stamp_download).to be_valid
    end
  end

  describe 'advanced?' do
    it 'returns true if stamp_download is advanced' do
      stamp_download = FactoryBot.create(:stamp_download, :advanced)
      expect(stamp_download.advanced?).to be true
    end

    it 'returns false if stamp_download is not advanced' do
      stamp_download = FactoryBot.create(:stamp_download)
      expect(stamp_download.advanced?).to be false
    end
  end
end

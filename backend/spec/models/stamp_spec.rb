require 'rails_helper'

RSpec.describe Stamp, type: :model do

  describe 'validations' do
    let(:stamp) { FactoryBot.build(:stamp) }

    it 'is valid with valid attributes' do
      expect(stamp).to be_valid
    end

    it 'is not valid without a stamp_category' do
      stamp.stamp_category = nil
      expect(stamp).to_not be_valid
    end

    it 'is not valid without a stamp_type' do
      stamp.stamp_type = nil
      expect(stamp).to_not be_valid
    end

    it 'is not valid without an engraving_type' do
      stamp.engraving_type = nil
      expect(stamp).to_not be_valid
    end

    it 'is not valid without a font' do
      stamp.font = nil
      expect(stamp).to_not be_valid
    end

    it 'is valid without text' do
      stamp.text_1 = nil
      expect(stamp).to be_valid
    end

    it 'is not valid if is_advanced is not included in [true, false]' do
      stamp.balance = nil
      expect(stamp).to_not be_valid
    end
  end

  describe '#advanced?' do
    let(:stamp) { FactoryBot.build(:stamp) }
    let(:stamp_advanced) { FactoryBot.build(:stamp, :advanced) }

    it 'is true when is_advanced is true' do
      expect(stamp_advanced.advanced?).to be true
    end

    it 'is false when is_advanced is false' do
      expect(stamp.advanced?).to be false
    end
  end

  describe '#build_image / #build_image_advanced' do
    let(:stamp) { FactoryBot.build(:stamp) }
    let(:fake_url) { 'https://placehold.jp/150x150.png' }
    let(:mock_image) { instance_double(MiniMagick::Image) }

    before do
      allow(stamp).to receive(:build_image_url).and_return(fake_url)
      allow(MiniMagick::Image).to receive(:open).with(fake_url).and_return(mock_image)
      allow(stamp).to receive(:remove_white_background).with(mock_image).and_return(mock_image)
    end

    it 'returns MiniMagick::Image object with build_image' do
      image = stamp.build_image

      aggregate_failures do
        expect(stamp).to have_received(:build_image_url)
        expect(stamp).not_to have_received(:remove_white_background)
        expect(image).to eq mock_image
      end
    end

    it 'returns MiniMagick::Image object with build_image_advanced' do
      image = stamp.build_image_advanced

      aggregate_failures do
        expect(stamp).to have_received(:build_image_url)
        expect(stamp).to have_received(:remove_white_background).with(mock_image)
        expect(image).to eq mock_image
      end
    end
  end
end

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

  describe '#metadata' do
    let(:stamp) { FactoryBot.build(:stamp) }

    before do
      allow(stamp).to receive(:resolve_stamp_option_value).with(:engraving_text_title, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym, stamp.engraving_type.to_sym).and_return(['彫刻名'])
      allow(stamp).to receive(:resolve_stamp_option_hash).with(:stamp_category, stamp.stamp_category.to_sym).and_return({ personal: '個人印鑑' })
      allow(stamp).to receive(:resolve_stamp_option_hash).with(:stamp_type, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym).and_return({ official: '実印' })
      allow(stamp).to receive(:resolve_stamp_option_hash).with(:engraving_type, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym, stamp.engraving_type.to_sym).and_return({ one_row: '横1列左読み' })
      allow(stamp).to receive(:resolve_stamp_option_hash).with(:font, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym, stamp.font.to_sym).and_return({ insotai: '印相体' })
      allow(stamp).to receive(:resolve_stamp_option_hash).with(:balance, stamp.balance.to_sym).and_return({ large: '大' })
      allow(stamp).to receive(:resolve_stamp_option_value).with(:engraving_type, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym).and_return({
        one_row: '横1列左読み',
        one_row_old: '横1列右読み',
        two_rows: '横2列',
        one_col: '縦1列',
        two_cols: '縦2列',
      })
      allow(stamp).to receive(:resolve_stamp_option_value).with(:font, stamp.stamp_category.to_sym, stamp.stamp_type.to_sym).and_return({
			  insotai: '印相体',
				tenshotai: '篆書体',
			  kointai: '古印体',
			  reishotai: '隷書体',
			  gyoushotai: '行書体',
			  kaishotai: '楷書体',
      })
      allow(stamp).to receive(:resolve_stamp_option_value).with(:balance).and_return({
        large: '大',
        medium: '中',
        small: '小',
      })
    end

    it 'returns metadata' do
      expect(stamp.metadata).to eq({
        stamp_category: { personal: '個人印鑑' },
        stamp_type: { official: '実印' },
        engraving_type: { one_row: '横1列左読み' },
        font: { insotai: '印相体' },
        text: { '彫刻名' => stamp.text_1 },
        is_advanced: stamp.is_advanced,
        balance: { large: '大' },
        engraving_type_candidates: {
          one_row: '横1列左読み',
          one_row_old: '横1列右読み',
          two_rows: '横2列',
          one_col: '縦1列',
          two_cols: '縦2列',
        },
        font_candidates: {
          insotai: '印相体',
          tenshotai: '篆書体',
          kointai: '古印体',
          reishotai: '隷書体',
          gyoushotai: '行書体',
          kaishotai: '楷書体',
        },
        balance_candidates: {
          large: '大',
          medium: '中',
          small: '小',
        },
      })
    end
  end
end

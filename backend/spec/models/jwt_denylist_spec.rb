require 'rails_helper'

RSpec.describe JwtDenylist, type: :model do

  describe 'validations' do
    let(:jwt_denylist) { FactoryBot.build(:jwt_denylist) }

    it 'is valid with valid attributes' do
      expect(jwt_denylist).to be_valid
    end

    it 'increases the number of jwt_denylist by 1' do
      expect { jwt_denylist.save }.to change(JwtDenylist, :count).by(1)
    end

    it 'is not valid without a jti' do
      jwt_denylist.jti = nil
      expect(jwt_denylist).to_not be_valid
    end

    it 'is not valid with a duplicate jti' do
      jwt_denylist.save
      jwt_denylist_duplicated = FactoryBot.build(:jwt_denylist, jti: jwt_denylist.jti)

      expect(jwt_denylist_duplicated).to_not be_valid
    end

    it 'is not valid without an exp' do
      jwt_denylist.exp = nil
      expect(jwt_denylist).to_not be_valid
    end

    it 'is not valid with an expired exp' do
      jwt_denylist.exp = 1.day.ago
      expect(jwt_denylist).to_not be_valid
    end
  end
end

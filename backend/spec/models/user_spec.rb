require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'validations' do
    let(:user) { FactoryBot.build(:user) }

    it 'is valid with valid attributes' do
      expect(user).to be_valid
    end

    it 'increases the number of users by 1' do
      expect { user.save }.to change { User.count }.by(1)
    end

    it 'is not valid without an email' do
      user.email = nil
      expect(user).to_not be_valid
    end

    it 'is not valid with a invalid email' do
      user.email = 'invalid_email'
      expect(user).to_not be_valid
    end

    it 'is not valid with a duplicated email' do
      user.save
      user_with_duplicated_email = FactoryBot.build(:user, email: user.email)
      expect(user_with_duplicated_email).to_not be_valid
    end

    it 'is not valid without a password' do
      user.password = ''
      expect(user).to_not be_valid
    end

    it 'is not valid without a is_admin' do
      user.is_admin = nil
      expect(user).to_not be_valid
    end

    it 'is valid with is_admin is not included in [true, false]' do
      user.is_admin = 'invalid'
      user.save
      aggregate_failures do
        expect(user).to be_valid
        expect(user.reload.is_admin).to be true
      end
    end

    it 'is not valid without a provider' do
      user.provider = nil
      expect(user).to_not be_valid
    end

    it 'is not valid without a uid' do
      user.uid = nil
      expect(user).to_not be_valid
    end

    it 'is not valid with a duplicated uid and provider' do
      user.save
      user_with_duplicated_uid_and_provider = FactoryBot.build(
        :user,
        uid: user.uid,
        provider: user.provider
      )
      expect(user_with_duplicated_uid_and_provider).to_not be_valid
    end

    it 'is not valid with a duplicated confirmation_token' do
      user.save
      user_with_duplicated_confirmation_token = FactoryBot.build(
        :user,
        confirmation_token: user.confirmation_token
      )
      expect(user_with_duplicated_confirmation_token).to_not be_valid
    end

    it 'is not valid with a duplicated reset_password_token' do
      user.save
      user_with_duplicated_reset_password_token = FactoryBot.build(
        :user,
        reset_password_token: user.reset_password_token
      )
      expect(user_with_duplicated_reset_password_token).to_not be_valid
    end

    it 'does not increase the number of users when user is invalid' do
      user.password = ''
      expect { user.save }.to_not change { User.count }
    end
  end

  describe 'associations' do
    it 'has many stamp_downloads' do
      user = FactoryBot.create(:user)
      stamp_download1 = FactoryBot.create(:stamp_download, user: user)

      expect(user.stamp_downloads).to include(stamp_download1)
    end
  end

  describe 'admin?' do
    it 'returns true if user is admin' do
      admin = FactoryBot.create(:user, :admin)
      expect(admin.admin?).to be true
    end

    it 'returns false if user is not admin' do
      user = FactoryBot.create(:user)
      expect(user.admin?).to be false
    end
  end
end

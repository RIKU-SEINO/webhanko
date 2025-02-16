class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  validates :jti, presence: true, uniqueness: true
  validates :exp, presence: true, comparison: { greater_than: Time.current }
end

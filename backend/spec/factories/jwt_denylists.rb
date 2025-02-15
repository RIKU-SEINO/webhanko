FactoryBot.define do
  factory :jwt_denylist do
    jti { "MyString" }
    exp { "2025-02-13 20:29:45" }
  end
end
